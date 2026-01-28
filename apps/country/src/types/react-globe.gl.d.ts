declare module 'react-globe.gl' {
  import { ForwardRefExoticComponent, RefAttributes } from 'react';

  export interface GlobeProps {
    globeImageUrl?: string;
    backgroundImageUrl?: string;
    lineHoverPrecision?: number;
    polygonsData?: any[];
    polygonAltitude?: number | ((d: any) => number);
    polygonCapColor?: string | ((d: any) => string);
    polygonSideColor?: string | ((d: any) => string);
    polygonStrokeColor?: string | ((d: any) => string);
    polygonLabel?: string | ((d: any) => string);
    onPolygonHover?: (d: any) => void;
    onPolygonClick?: (d: any) => void;
    onGlobeClick?: (d: any) => void;
    width?: number;
    height?: number;
    backgroundColor?: string;
    [key: string]: any;
  }

  export interface GlobeMethods {
    controls(): any;
    pointOfView(coords: { lat: number; lng: number; altitude?: number }, ms?: number): void;
    pauseAnimation(): void;
    resumeAnimation(): void;
  }

  const Globe: ForwardRefExoticComponent<GlobeProps & RefAttributes<GlobeMethods>>;
  export default Globe;
}
