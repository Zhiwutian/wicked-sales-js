require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
  SELECT "productId", "name", "price", "image", "shortDescription"
  FROM "products"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"productID" must be a positive integer'
    });
  }
  const sql = `
  SELECT *
  FROM "products"
  WHERE "productId" = $1
  `;
  const values = [productId];
  db.query(sql, values)
    .then(result => {
      const productDetails = result.rows[0];
      if (productDetails) {
        res.status(400).json(productDetails);
      } else {
        next(new ClientError('No products exist with the supplied product id', 404));
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    return res.status(200).json([]);
  }
  const cartId = req.session.cartId;
  const sql = `
  SELECT "c"."cartItemId",
         "c"."price",
         "c"."productId",
         "p"."image",
         "p"."name",
         "p"."shortDescription"
  FROM "cartItems" as "c"
  JOIN "products" as "p" using ("productId")
  WHERE "c"."cartId" = $1
  `;
  const values = [cartId];
  db.query(sql, values)
    .then(result => {
      return res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/cart/:productId', (req, res, next) => {
  const { cartId } = req.session;
  const productId = parseInt(req.params.productId);
  if (!Number.isInteger(productId) || productId <= 0) {
    res.status(400).json('Product id must be a positive integer');
  }
  const sql = `
    SELECT "price"
    FROM "products"
    WHERE "productId" = $1
    `;
  const values = [productId];
  db.query(sql, values)
    .then(priceResult => {
      if (!priceResult.rows.length) {
        throw new ClientError('The requested information does not exist.', 400);
      }
      if (cartId) {
        const [{ price }] = priceResult.rows;
        return {
          cartId: cartId,
          price: price
        };
      }
      const sql = `
      INSERT INTO "carts" ("cartId", "createdAt")
      values (default, default)
      returning "cartId"
      `;
      return db.query(sql)
        .then(insertResult => {
          const [{ cartId }] = insertResult.rows;
          const [{ price }] = priceResult.rows;
          return {
            cartId: cartId,
            price: price
          };
        });
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const sql = `
    INSERT INTO "cartItems" ("cartId", "productId", "price")
    VALUES ($1, $2, $3)
    returning "cartItemId"
    `;
      const values = [result.cartId, productId, result.price];
      return db.query(sql, values);
    })
    .then(insertCartResult => {
      const [{ cartItemId }] = insertCartResult.rows;
      const sql = `
    SELECT "c"."cartItemId",
           "c"."price",
           "p"."productId",
           "p"."image",
           "p"."name",
           "p"."shortDescription"
    FROM "cartItems" as "c"
    JOIN "products" as "p" using ("productId")
    WHERE "c"."cartItemId" = $1
    `;
      const values = [cartItemId];
      return db.query(sql, values)
        .then(result => {
          const cartItem = result.rows[0];
          return res.status(201).json(cartItem);
        });
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  const cartId = req.session.cartId;
  if (!cartId) {
    return res.status(400).json({ error: 'no cart id found.' });
  }
  const { name, creditCard, shippingAddress } = req.body;
  const errors = {};
  if (!name) {
    errors.name = 'missing or invalid name.';
  }
  if (!creditCard) {
    errors.creditCard = 'missing or invalid credit card number.';
  }
  if (!shippingAddress) {
    errors.shippingAddress = 'missing or invalid shipping address.';
  }
  if (Object.keys(errors).length) {
    return res.status(400).json(errors);
  }

  const sql = `
  INSERT INTO "orders" ("name", "creditCard", "shippingAddress", "cartId")
  VALUES ($1, $2, $3, $4)
  RETURNING "orderId", "createdAt", "name", "creditCard", "shippingAddress"
  `;
  const values = [name, creditCard, shippingAddress, cartId];

  db.query(sql, values)
    .then(result => {
      delete req.session.cartId;
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
