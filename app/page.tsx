import { Metadata } from 'next';
import Heading from './ui/components/heading';

export const metadata: Metadata = {
  title: 'Home',
};
export default function Home() {
  return (
    <>
      <Heading level={1}>Home</Heading>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus excepturi
        accusamus minus nostrum nihil? Exercitationem sed error doloremque sint ullam.
      </p>
    </>
  );
}
