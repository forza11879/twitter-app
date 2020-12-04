import Card from './Card.component';
// import { CSSTransitionGroup } from 'react-transition-group';
function ItemsCards({ items }) {
  return items.map((x, i) => <Card key={i} data={x} />);
}

export default ItemsCards;

// let itemsCards = (
//   <CSSTransitionGroup
//     transitionName="example"
//     transitionEnterTimeout={500}
//     transitionLeaveTimeout={300}
//   >
//     {items.map((x, i) => (
//       <CardComponent key={i} data={x} />
//     ))}
//   </CSSTransitionGroup>
// );
