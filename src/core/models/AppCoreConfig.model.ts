export interface AppCoreConfigModel{
  screens:Screens;
  detectScreenSizeChange: boolean;
}


export type Screens = {
  sm:number;
  md:number;
  lg:number;
  xl:number;
};
