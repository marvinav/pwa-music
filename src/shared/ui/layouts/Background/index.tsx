/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
export interface BackgroundBaseProperties {
    particlesConfig?: string;
    imgSrc?: string;
    color?: string;
    type: 'particles' | 'img' | 'color';
}

export interface ImageBackgroundProperties extends BackgroundBaseProperties {
    type: 'img';
    imgSrc: string;
}

export interface ParticlesBackgroundProperties extends BackgroundBaseProperties {
    type: 'particles';
    particlesConfig: string;
}

export interface ColorBackgroundProperties extends BackgroundBaseProperties {
    type: 'color';
    color: string;
}

export const Background: React.FC<
    ImageBackgroundProperties | ParticlesBackgroundProperties | ColorBackgroundProperties
> = (properties) => {
    switch (properties.type) {
        case 'particles':
        default:
            import('particles.js').then((_x) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (window as unknown as { particlesJS: any }).particlesJS.load(
                    'particles-js-background',
                    properties.particlesConfig,
                );
            });
            return (
                <div
                    style={{ position: 'fixed', left: 0, top: 0, width: '100%', height: '100%', zIndex: -1 }}
                    id="particles-js-background"
                ></div>
            );
        case 'color':
            return (
                <div
                    style={{
                        color: properties.color,
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: -1,
                    }}
                    id="color-background"
                ></div>
            );
        case 'img':
            return (
                <div
                    style={{
                        backgroundImage: `url(${properties.imgSrc})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                    }}
                    id="image-background"
                ></div>
            );
    }
};

export const BackgroundMemo = React.memo(Background, (p, n) => {
    if (n.type !== p.type) {
        return false;
    }

    switch (n.type) {
        case 'particles':
            return p?.particlesConfig === n?.particlesConfig;
        case 'img':
            return p?.imgSrc === n?.imgSrc;
        case 'color':
            return p?.color === n?.color;
        default:
            return false;
    }
});
