import { TitleContainer } from '../styled';

interface TitleRowProps {
  reversedFieldsOrder?: boolean;
}

const TitleRow = ({ reversedFieldsOrder = false }: TitleRowProps) => {
  return (
    <TitleContainer reverse={reversedFieldsOrder}>
      <span>Price</span>
      <span>Size</span>
      <span>Total</span>
    </TitleContainer>
  );
};

export default TitleRow;
