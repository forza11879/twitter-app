import Card from './Card.component.jsx';

function ItemsCards({ allTweetIds }) {
  return allTweetIds.map((x, i) => <Card key={i} data={x} />);
}

export default ItemsCards;
