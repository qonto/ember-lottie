import type LottieComponent from './components/lottie';

export default interface Registry {
  Lottie: typeof LottieComponent;
}
