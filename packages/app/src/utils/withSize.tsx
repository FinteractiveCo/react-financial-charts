import React, { FC } from "react";
import AutoSizer, {
  Props as AutoSizerProps,
} from "react-virtualized-auto-sizer";

export interface WithSizeProps {
  readonly width: number;
  readonly height: number;
}

export const withSize = (props?: Omit<AutoSizerProps, "children">) => {
  return <TProps extends WithSizeProps>(
    OriginalComponent: React.ComponentType<TProps>
  ) => {
    const WithSize: FC<Omit<TProps, "width" | "height">> = (restProps) => {
      return (
        <AutoSizer {...props} disableHeight={false} disableWidth={false}>
          {({ height, width }: {width: number, height: number}) => (
            <OriginalComponent
              {...(restProps as TProps)}
              height={height}
              width={width}
            />
          )}
        </AutoSizer>
      );
    };
    return WithSize;
  };
};
