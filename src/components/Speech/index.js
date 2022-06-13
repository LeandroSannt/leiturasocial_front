import { useSpeechSynthesis } from 'react-speech-kit';
import { Container } from './styles';
import { AiFillPlayCircle} from 'react-icons/ai';
import { HiStop } from 'react-icons/hi';

export function Example({text}) {
  const { speak, speaking, cancel } = useSpeechSynthesis();

  return (
      <Container onClick={() => {speaking ? cancel({text}) : speak({text}) }}>
        {speaking ? <HiStop/> : <AiFillPlayCircle/>}
        Ouvir
      </Container>

  );
}