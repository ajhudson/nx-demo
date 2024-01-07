import styled from 'styled-components';

/* eslint-disable-next-line */
export interface BoringLabelProps {}

const StyledBoringLabel = styled.div`
  color: pink;
`;

export function BoringLabel(props: BoringLabelProps) {
  return (
    <StyledBoringLabel>
      <h1>Welcome to BoringLabel!</h1>
    </StyledBoringLabel>
  );
}

export default BoringLabel;
