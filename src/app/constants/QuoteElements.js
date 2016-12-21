import uuid from 'uuid/v4';

export function text() {
  return {
    type: 'text',
    id: uuid(),
    content: {
      text: {
        comments: [],
        id: uuid(),
        value: '<p>Cuerpo del elemento de texto.</p>'
      },
      title: {
        comments: [],
        id: uuid(),
        value: 'Nuevo elemento de texto'
      }
    }
  };
};

export function list() {
  return {
    type: 'list',
    id: uuid(),
    content: {
      text: {
        comments: [],
        id: uuid(),
        value: '<p>Cuerpo del elemento de lista.</p>'
      },
      title: {
        comments: [],
        id: uuid(),
        value: 'Nuevo elemento de lista'
      },
      list: {
        id: uuid(),
        value: [
          {
            comments: [],
            id: uuid(),
            value: 'Elemento de lista'
          }
        ]
      }
    }
  };
};

export function images() {
  return {
    type: 'images',
    id: uuid(),
    content: {
      text: {
        comments: [],
        id: uuid(),
        value: '<p>Cuerpo del elemento de lista.</p>'
      },
      title: {
        comments: [],
        id: uuid(),
        value: 'Nuevo elemento de imágenes'
      },
      images: {
        id: uuid(),
        value: [
          {
            comments: [],
            id: uuid(),
            value: 'https://vincoorbis.com/wp-content/uploads/2016/03/logo.png'
          }
        ]
      }
    }
  };
};

export function calendar() {
  return {
    type: 'calendar',
    id: uuid(),
    content: {
      title: {
        comments: [],
        id: uuid(),
        value: 'Nuevo elemento de calendario'
      },
      calendar: {
        total: 2,
        value: [
          {
            concept: 'Concepto 1',
            from: 1,
            id: uuid(),
            to: 2
          }
        ]
      }
    }
  };
};

export function price() {
  return {
    type: 'price',
    id: uuid(),
    content: {
      title: {
        comments: [],
        id: uuid(),
        value: 'Nuevo elemento de calendario'
      },
      text: {
        comments: [],
        id: uuid(),
        value: '<p>Cuerpo del elemento de lista.</p>'
      },
      price: {
        value: [
          {
            concept: 'Concepto 1',
            id: uuid(),
            price: "10.00"
          }
        ]
      }
    }
  };
};
