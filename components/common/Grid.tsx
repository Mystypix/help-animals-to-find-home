import * as React from 'react'
import { Grid as MUIGrid, GridSpacing } from '@mui/material'
import { ResponsiveStyleValue } from '@mui/system'

const Grid = ({
  spacing = 2,
  children,
  xs = 1,
  md = 3,
}: {
  spacing?: number
  xs?: number
  md?: number
  children: React.ReactNode
}) => (
  <MUIGrid container spacing={spacing as ResponsiveStyleValue<GridSpacing>}>
    {children &&
      React.Children.count(children) > 0 &&
      React.Children.map(children, (child: React.ReactNode, index: Number) => (
        <MUIGrid item xs={xs} md={md} key={`${index}`}>
          {child}
        </MUIGrid>
      ))}
  </MUIGrid>
)

export default Grid
