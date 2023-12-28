/**
 * @param {{count: number; shapeTemplate: Function}} params
 * @returns {Object}
 */
export function repeatProptypeStructure({ count, shapeTemplate }) {
  let counter = 1

  let obj = {}

  while (counter <= count) {
    Object.assign(obj, shapeTemplate(counter))

    counter += 1
  }

  return obj
}

/**
 * Input:
 *  repeatProptypeStructure({ count: 2, shapeTemplate: counter => {
 *    return {
 *      [`prop${counter}`]: PropTypes.string.tag({
 *        group: `group number ${counter}`,
 *        label: 'my prop'
 *       })
 *    }
 *  }})
 *
 * Output:
 *  {
 *    prop1: PropTypes.string.tag({
 *      group: `group number 1`,
 *      label: 'my prop'
 *    }),
 *    prop2: PropTypes.string.tag({
 *      group: `group number 2`,
 *      label: 'my prop'
 *    })
 *  }
 *
 * How to use:
 *  MyComponent.propTypes = {
 *    customFields: PropTypes.shape({
 *      ...repeatProptypeStructure({ count: 2, shapeTemplate: counter => {
 *        return {
 *          [`prop${counter}`]: PropTypes.string.tag({
 *            group: `group number ${counter}`,
 *            label: 'my prop'
 *          })
 *        }
 *      }})
 *    })
 *  }
 *
 */
