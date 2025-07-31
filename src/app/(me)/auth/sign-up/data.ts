export const agreementData = {
  all: {
    label: '전체 동의하기',
    content:
      '서비스 이용약관, 인증된 이메일로 가입, 이벤트・혜택 정보 수신(선택) 동의를 포함합니다.',
  },
  items: [
    {
      name: 'serviceTos' as const,
      label: '서비스 이용약관에 동의합니다.',
      content: '내용 '.repeat(1000),
      required: true,
    },
    {
      name: 'personalInformationTos' as const,
      label: '개인정보 수집 및 이용에 동의합니다.',
      content: '내용 '.repeat(1000),
      required: true,
    },
    {
      name: 'optionalTos' as const,
      label: '이벤트 혜택 정보 수신에 동의합니다.',
      content: '내용 '.repeat(1000),
    },
  ],
};
