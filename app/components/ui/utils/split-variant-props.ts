interface Recipe {
  (props?: any): any
  variantKeys: string[]
}

export const splitVariantProps = <T extends Recipe>(props: any, recipe: T) => {
  const variantKeys = recipe.variantKeys
  const variantProps: any = {}
  const otherProps: any = {}

  for (const [key, value] of Object.entries(props)) {
    if (variantKeys.includes(key)) {
      variantProps[key] = value
    } else {
      otherProps[key] = value
    }
  }

  return [variantProps, otherProps] as [ReturnType<T>, any]
}
