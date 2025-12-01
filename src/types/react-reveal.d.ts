declare module 'react-reveal/Fade' {
  import { ComponentType, ReactNode } from 'react';

  interface FadeProps {
    bottom?: boolean;
    top?: boolean;
    left?: boolean;
    right?: boolean;
    duration?: number;
    delay?: number;
    distance?: string;
    children?: ReactNode;
  }

  const Fade: ComponentType<FadeProps>;
  export default Fade;
}

declare module 'react-reveal/Zoom' {
  import { ComponentType, ReactNode } from 'react';

  interface ZoomProps {
    duration?: number;
    delay?: number;
    distance?: string;
    children?: ReactNode;
  }

  const Zoom: ComponentType<ZoomProps>;
  export default Zoom;
}

declare module 'react-reveal/Flip' {
  import { ComponentType, ReactNode } from 'react';

  interface FlipProps {
    horizontal?: boolean;
    vertical?: boolean;
    duration?: number;
    delay?: number;
    children?: ReactNode;
  }

  const Flip: ComponentType<FlipProps>;
  export default Flip;
}
