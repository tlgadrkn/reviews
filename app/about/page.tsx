import { Metadata } from 'next';
import Heading from '../ui/components/heading';

export const metadata: Metadata = {
  title: 'About',
};
export default function About() {
  return <Heading level={1}>About</Heading>;
}
