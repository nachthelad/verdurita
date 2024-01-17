import * as React from 'react';
import CardItem from '../CardItem'; 
import styles from './CardContainer.module.css'; 

interface CardContainerProps {
  items: Array<{ texto: string; precio: number }>;
}

const CardContainer = ({ items }: CardContainerProps) => {
  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <CardItem key={index} texto={item.texto} precio={item.precio} />
      ))}
    </div>
  );
};

export default CardContainer;
