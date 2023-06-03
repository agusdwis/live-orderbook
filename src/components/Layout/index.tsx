import { Base, Container } from './styled';

interface IPageLayout {
  children: React.ReactNode;
}

export default function PageLayout({ children }: IPageLayout) {
  return (
    <Base>
      <Container>{children}</Container>
    </Base>
  );
}
