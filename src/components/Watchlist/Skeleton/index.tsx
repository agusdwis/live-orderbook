import { Skeleton } from '../styled';

export default function CardSkeleton() {
  return (
    <>
      {Array.from([1, 2, 3, 4, 5, 6]).map((item) => (
        <Skeleton key={item} />
      ))}
    </>
  );
}
