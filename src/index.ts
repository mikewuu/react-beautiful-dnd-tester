import React from 'react'

export const render = (ui: React.ReactNode | null) => ({
  drag: () => {
    console.log(ui)
  },
})
