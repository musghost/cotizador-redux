import {
  TOGGLE_LOGIN,
  ADD_LOGIN_ERRORS
} from '../constants/ActionTypes';

const initialState = [
    {
      id: '5dd08e4d-cccf-4d43-ae20-94999db39071',
      type: 'text',
      content: {
        title: {
          id: '876918b1-071b-44ee-9aac-1666ee0f3192',
          comments: [
            {
              id: '0c07e24f-9e8d-4add-aeaf-c4c874945222',
              from: {
                name: 'Andrés',
                userId: 46
              },
              value: 'Creo que es mejor agregar más tiempo a esta parte.',
              date: '20-10-1987 10:10:10'
            }
          ],
          value: 'Cotización de webapp para Aeroméxico'
        },
        text: {
          id: '781159b6-addb-4e21-bed6-fdbb726f228a',
          comments: [],
          value: '<p>Texto abierto. Se valen negritas e itálicas. Y salto de párrafo. Deseable, no requerido, ligas. No permitir más de dos saltos de línea seguidos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet blandit erat. Integer eu massa sit amet augue fermentum vulputate vel sed ex. Nunc sagittis dolor in justo molestie tristique. Vivamus placerat bibendum diam, vel iaculis tellus aliquet in. Duis pharetra purus non sem pharetra, eu consequat justo tincidunt. Vivamus tincidunt mi odio, nec varius dui ultricies sit amet. Nulla vel ultrices sapien. Idealmente permitir viñetas y numéricos.</p><ul><li>Aquí va una viñeta en el texto.</li><li>Morbi tristique sagittis elit, non molestie dolor auctor quis. </li><li>Donec vitae venenatis nulla. </li></ul><p>Y también pongo ejemplo de numéricos.</p><ol><li>Etiam et tellus non justo efficitur consectetur sit amet in quam. </li><li>Praesent et fringilla ante. </li><li>Pellentesque dictum dolor nec justo molestie, in suscipit ligula iaculis. </li><li>Donec laoreet odio ac augue consectetur, et efficitur nibh cursus. </li><li>Nam et risus non lacus rhoncus pellentesque.</li></ol><p>Pellentesque vestibulum justo nibh, sed auctor purus imperdiet id. Nulla auctor aliquam leo. Duis vitae scelerisque libero. Deseable, no requerido. Curabitur et dui et ante gravida dignissim. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In hac habitasse platea dictumst. Etiam facilisis sem quis elit efficitur hendrerit. Nam malesuada elit nec eros luctus, non pharetra nisl sagittis. Sed porttitor, tellus sit amet consectetur consectetur, libero lacus consequat orci, ut vulputate nisi diam non diam. Quisque non commodo metus. Integer mollis tincidunt enim non accumsan. Maecenas convallis est magna, sit amet pulvinar elit suscipit ut. Aliquam at felis ornare, auctor turpis eget, viverra risus. Sed rhoncus turpis nulla, eu finibus felis finibus at. Nulla a pellentesque orci.</p>'
        }
      }
    },
    {
      id: '8ff452ee-b9cd-4d5d-a500-542108e33a83',
      type: 'list',
      content: {
        title: {
          id: '75fd0838-f05e-41fe-8e84-d560f956055a',
          comments: [],
          value: 'Sección tipo listado'
        },
        text: {
          id: '7da0feb7-672e-4975-b448-271c219d6a8d',
          comments: [],
          value: '<p>La sección de listado puede tener un sección de texto hasta arriba. Como la presente y luego viñetas. Se distingue de la sección de texto en que las viñetas específicas forman parte de la cotización base como elementos, no como parte del texto. Esto será más claro en la vista de edición.</p><p>Deseable, no requerido, formato de negritas e itálicas en cada parte del listado. Deseable, no requerido, poder elegir si la lista tendrá un formato de viñeta o numérico. Deseable, no requerido, poder tener ligas en la lista. A continuación ejemplo de listado de viñetas.</p>'
        },
        list: {
          id: '7b2e51bc-b963-474c-88e0-43a3c6cf0018',
          value: [
            {
              id: '7b2e51bc-b963-474c-88e0-43a3c6cf0000',
              value: 'Aquí va una viñeta en el texto.',
              comments: []
            },
            {
              id: '7b2e51bc-b963-474c-88e0-43a3c6cf0001',
              value: 'Morbi tristique sagittis elit, non molestie dolor auctor quis.',
              comments: []
            },
            {
              id: '7b2e51bc-b963-474c-88e0-43a3c6cf0002',
              value: 'Donec vitae venenatis nulla.',
              comments: []
            },
            {
              id: '7b2e51bc-b963-474c-88e0-43a3c6cf0003',
              value: 'Etiam et tellus non justo efficitur consectetur sit amet in quam.',
              comments: []
            },
            {
              id: '7b2e51bc-b963-474c-88e0-43a3c6cf0004',
              value: 'Praesent et fringilla ante.',
              comments: []
            },
            {
              id: '7b2e51bc-b963-474c-88e0-43a3c6cf0005',
              value: 'Pellentesque dictum dolor nec justo molestie, in suscipit ligula iaculis.',
              comments: []
            },
            {
              id: '7b2e51bc-b963-474c-88e0-43a3c6cf0006',
              value: 'Donec laoreet odio ac augue consectetur, et efficitur nibh cursus.',
              comments: []
            },
            {
              id: '7b2e51bc-b963-474c-88e0-43a3c6cf0007',
              value: 'Nam et risus non lacus rhoncus pellentesque.',
              comments: []
            }
          ]
        }
      }
    },
    {
      id: '7b2e51bc-b963-474c-88e0-43a3c6cf0011',
      type: 'images',
      content: {
        title: {
          id: '7b2e51bc-b963-474c-88e0-43a3c6cf0012',
          comments: [],
          value: 'Sección tipo imágenes'
        },
        text: {
          id: '7b2e51bc-b963-474c-88e0-43a3c6cf0013',
          comments: [],
          value: '<p>La sección de imágenes puede tener un sección de texto hasta arriba. Como la presente y luego imagen. No nos preocupa alineación o tamaño. La sección puede o no tener más de una imagen.</p><p>Las imágenes, por supuesto, deben poder cargarse desde la computadora del usuario.</p>'
        },
        images: {
          id: '7b2e51bc-b963-474c-88e0-43a3c6cf0033',
          value: [
            {
              id: '7b2e51bc-b963-474c-88e0-43a3c6cf0014',
              comments: [],
              value: 'http://r.ddmcdn.com/s_f/o_1/cx_633/cy_0/cw_1725/ch_1725/w_720/APL/uploads/2014/11/too-cute-doggone-it-video-playlist.jpg'
            }
          ]
        }
      }
    },
    {
      id: '7b2e51bc-b963-474c-88e0-43a3c6cf0015',
      type: 'calendar',
      content: {
        title: {
          id: '7b2e51bc-b963-474c-88e0-43a3c6cf0016',
          value: 'Sección tipo calendario de trabajo',
          comments: []
        },
        calendar: {
          total: 14,
          value: [
            {
              id: '7b2e51bc-b963-474c-88e0-43a3c6cf0017',
              concept: 'Consultoría',
              from: 1,
              to: 4
            },
            {
              id: '7b2e51bc-b963-474c-88e0-43a3c6cf0018',
              concept: 'Diseño y modelado técnico',
              from: 4,
              to: 6
            },
            {
              id: '7b2e51bc-b963-474c-88e0-43a3c6cf0019',
              concept: 'Diseño gráfico',
              from: 6,
              to: 9
            },
            {
              id: '7b2e51bc-b963-474c-88e0-43a3c6cf0020',
              concept: 'Diseño y modelado técnico',
              from: 9,
              to: 15
            },
          ]
        }
      }
    },
    {
      id: '7b2e51bc-b963-474c-88e0-43a3c6cf0021',
      type: 'price',
      content: {
        title: {
          id: '7b2e51bc-b963-474c-88e0-43a3c6cf0022',
          value: 'Sección tipo contraprestación',
          comments: []
        },
        text: {
          id: '7b2e51bc-b963-474c-88e0-43a3c6cf0023',
          value: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
          comments: []
        },
        concepts: {
          value: [
            {
              id: '7b2e51bc-b963-474c-88e0-43a3c6cf0024',
              concept: 'Implementación de infraestructura',
              price: '1000.00'
            },
            {
              id: '7b2e51bc-b963-474c-88e0-43a3c6cf0025',
              concept: 'Diseño de arquitectura',
              price: '500.00'
            }
          ]
        }
      }
    }
  ];

export default function quote(state = initialState, action) {
  switch (action.type) {

    default:
      return state;
  }
}
