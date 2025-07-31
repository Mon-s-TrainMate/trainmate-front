interface Props {
  params: Promise<{ memberId: string }>;
}
export default async function Page({ params }: Props) {
  const { memberId } = await params;
  return memberId;
}
