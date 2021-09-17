import React from 'react';


export function Background(props: {
    particlesConfig: string
}) {

    import('particles.js').then(x => {
        (window as unknown as { particlesJS: any }).particlesJS.load('particles-js-background', props.particlesConfig);
    });

    return <div style={{ position: 'fixed', left: 0, top: 0, width: '100%', height: '100%', zIndex: -1 }} id="particles-js-background"></div>
}

export const BackgroundMemo = React.memo(Background, (p, n) => {
    return p?.particlesConfig === n?.particlesConfig
})