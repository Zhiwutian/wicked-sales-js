export default function priceFormatter(price) {
  const priceString = price.toString();

  switch (priceString.length) {
    case 3: return `$${priceString[0]}.${priceString.slice(1)}`;
    case 4: return `$${priceString.slice(0, 2)}.${priceString.slice(2)}`;
    case 5: return `$${priceString.slice(0, 3)}.${priceString.slice(3)}`;
  }
}
