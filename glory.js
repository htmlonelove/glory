let gloryBtn = document.getElementById('glory');
gloryBtn.addEventListener('click', async () => {
  // получаем доступ к активной вкладке
  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  // выполняем скрипт
  chrome.scripting.executeScript({
    // скрипт будет выполняться во вкладке, которую нашли на предыдущем этапе
    target: {tabId: tab.id},
    // вызываем функцию, в которой лежит запуск снежинок
    function: initGlory,
  });
});

const initGlory = () => {
  if (document.querySelector('.ts-panel')) {
    document.querySelector('.ts-panel').remove();
    return;
  }

  // встраивание стилей
  const css = `
  .ts-panel {
    position: fixed;
    bottom: 20px;
    left: 50%;
    padding: 10px 10px 0;
    background-color: rgba(0, 160, 223, 0.5);
    border-radius: 3px;
    z-index: 999999999999;

    width: calc(100% - 40px);
    max-width: 1200px;
    transform: translateX(-50%);

    transition: all 0.3s ease;
  }

  .ts-btn {
    border: 0;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    color: #ffffff;
    background: rgb(231, 46, 139);
    background-color: #2c39f2;
    transition: all 0.3s ease;
    margin-right: 10px;
    margin-bottom: 10px;
    transition: all 0.3s ease;
  }

  .ts-btn:hover {
    background-color: rgb(231,46,139);
    background-color: #ff1553;
  }

  .ts-btn:last-child {
    margin-right: 0;
  }

  .ts-console {
    width: 100%;
    padding: 10px;
    border-radius: 3px;
    background-color: rgba(0, 160, 223, 0.8);
    bottom: 150px;
    left: 20px;
    color: #fff;
    width: 100%;
    min-width: 300px;
    white-space: pre;
    font-family: monospace;
    margin-bottom: 20px;

    max-height: 80vh;
    overflow-y: scroll;
  }

  @media (max-width: 768px) {
    .ts-console {
      display: none;
    }
  }

  .ts-panel--close {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #2c39f2;
  }

  .ts-panel--close:hover {
    background-color: #ff1553;
  }

  .ts-panel--close .ts-btn {
    display: none;
  }

  .ts-panel--close .ts-console {
    display: none;
  }`;

  let textNodes = [...getTextNodesIn(document.body)];
  const domClone = document.body.cloneNode(true);
  const styles = document.createElement('style');
  styles.innerHTML = css;
  document.head.appendChild(styles);

  // создание панели
  const panel = document.createElement('div');
  panel.classList = 'ts-panel';

  // консоль
  const con = document.createElement('div');
  con.classList = 'ts-console';
  panel.appendChild(con);

  // кнопка для переполнения текстом
  const moreText = document.createElement('button');
  moreText.type = 'button';
  moreText.textContent = 'проверить переполнение текстом';
  moreText.classList = 'ts-btn ts-btn--more';
  panel.appendChild(moreText);

  // кнопка для переполнения списков
  const moreList = document.createElement('button');
  moreList.type = 'button';
  moreList.textContent = 'проверить переполнение списков';
  moreList.classList = 'ts-btn ts-btn--more-list';
  panel.appendChild(moreList);

  // кнопка для включения свободного редактирования контента
  const edit = document.createElement('button');
  edit.type = 'button';
  edit.textContent = 'включить редактирование';
  edit.classList = 'ts-btn ts-btn--edit';
  panel.appendChild(edit);

  // кнопка для удаления контентных изображений
  const contentImageRemove = document.createElement('button');
  contentImageRemove.type = 'button';
  contentImageRemove.textContent = 'удалить контентные изображения';
  contentImageRemove.classList = 'ts-btn ts-btn--image';
  panel.appendChild(contentImageRemove);

  // кнопка удаления фоновых изображений
  const bgImageRemove = document.createElement('button');
  bgImageRemove.type = 'button';
  bgImageRemove.textContent = 'удалить фоновые изображения';
  bgImageRemove.classList = 'ts-btn ts-btn--image';
  panel.appendChild(bgImageRemove);

  // кнопка изменения изображения 100*100
  const contentImageSmallChange = document.createElement('button');
  contentImageSmallChange.type = 'button';
  contentImageSmallChange.textContent = 'изменить на изображения 100*100';
  contentImageSmallChange.classList = 'ts-btn ts-btn--image';
  panel.appendChild(contentImageSmallChange);

  // кнопка изменения изображения 100*100
  const contentImageBigVerticalChange = document.createElement('button');
  contentImageBigVerticalChange.type = 'button';
  contentImageBigVerticalChange.textContent = 'изменить на изображения 500*1000';
  contentImageBigVerticalChange.classList = 'ts-btn ts-btn--image';
  panel.appendChild(contentImageBigVerticalChange);

  // кнопка изменения изображения 100*100
  const contentImageBigHorizontalChange = document.createElement('button');
  contentImageBigHorizontalChange.type = 'button';
  contentImageBigHorizontalChange.textContent = 'изменить на изображения 1000*500';
  contentImageBigHorizontalChange.classList = 'ts-btn ts-btn--image';
  panel.appendChild(contentImageBigHorizontalChange);

  // кнопка для получения информации о контентных изображениях
  const imageInfo = document.createElement('button');
  imageInfo.type = 'button';
  imageInfo.textContent = 'информация о контентных изображениях';
  imageInfo.classList = 'ts-btn ts-btn--image';
  panel.appendChild(imageInfo);

  // кнопка для обводки элементов
  const outline = document.createElement('button');
  outline.type = 'button';
  outline.textContent = 'обвести элементы';
  outline.classList = 'ts-btn ts-btn--outline';
  panel.appendChild(outline);

  // кнопка для ссылок
  const href = document.createElement('button');
  href.type = 'button';
  href.textContent = 'ссылки и кнопки';
  href.classList = 'ts-btn ts-btn--href';
  panel.appendChild(href);

  // кнопка для сброса изменений
  const resetButton = document.createElement('button');
  resetButton.type = 'button';
  resetButton.textContent = 'сброс изменений';
  resetButton.classList = 'ts-btn ts-btn--href';
  panel.appendChild(resetButton);

  // кнопка для скрытия панели
  const hide = document.createElement('button');
  hide.type = 'button';
  hide.textContent = 'скрыть';
  hide.classList = 'ts-btn ts-btn--hide';
  panel.appendChild(hide);

  // вставка панели в страницу
  document.body.appendChild(panel);

  // сброс изменений
  resetButton.onclick = () => {
    document.body.innerHTML = domClone.innerHTML;
    textNodes = [...getTextNodesIn(document.body)];
    setTimeout(() => {
      document.body.appendChild(panel);
      moreList.textContent = 'проверить переполнение списков';
      moreText.textContent = 'проверить переполнение текстом';
      con.innerHTML = '';
    });
  };

  // переполнение контентом
  moreText.onclick = () => {
    textNodes.forEach((item) => {
      item.textContent = item.textContent + ' ' + item.textContent;
    });

    if (moreText.dataset.count) {
      moreText.textContent = 'проверить переполнение текстом(' + ++moreText.dataset.count + ')';
    } else {
      moreText.dataset.count = 1;
      moreText.textContent = 'проверить переполнение текстом(1)';
    }
  };

  moreList.onclick = () => {
    const listNodes = [...document.body.querySelectorAll('ul, ol, dl')];
    listNodes.forEach((list) => {
      const children = [...list.childNodes];
      children.forEach((child) => {
        const cloneChild = child.cloneNode(true);
        list.append(cloneChild);
      });
    });

    if (moreList.dataset.count) {
      moreList.textContent = `проверить переполнение списков(${++moreList.dataset.count})`;
    } else {
      moreList.dataset.count = 1;
      moreList.textContent = `проверить переполнение списков(${moreList.dataset.count})`;
    }
  };

  // находим все текстовые ноды
  function getTextNodesIn(elem) {
    let textNodes = [];
    elem.childNodes.forEach((node) => {
      nodeType = node.nodeType;
      if (nodeType == 3) {
        if (node.data.trim()) {
          textNodes.push(node);
        }
      } else if (nodeType == 1 || nodeType == 9 || nodeType == 11) {
        textNodes = textNodes.concat(getTextNodesIn(node));
      }
    });
    return textNodes;
  }

  // свободное редактирование
  edit.onclick = () => {
    const body = document.body;
    if (body.isContentEditable) {
      body.contentEditable = 'false';
      edit.textContent = 'включить редактирование';
    } else {
      body.contentEditable = 'true';
      edit.textContent = 'выключить редактирование';
    }
  };

  // удаление контентных изображений
  contentImageRemove.onclick = () => {
    const images = document.querySelectorAll('img, source');
    images.forEach((image) => {
      if (image.src) {
        image.src = '';
      }
      if (image.srcset) {
        image.srcset = '';
      }
      if (image.dataset.src) {
        image.dataset.src = '';
      }
    });
  };

  // изменение изображения на 100*100
  contentImageSmallChange.onclick = () => {
    const images = document.querySelectorAll('img, source');
    images.forEach((image) => {
      if (image.src) {
        image.src = 'https://i.ibb.co/xjsLf5r/100-100.jpg';
      }
      if (image.srcset) {
        image.srcset = 'https://i.ibb.co/xjsLf5r/100-100.jpg';
      }
    });
  };

  // изменение изображения на 500*1000
  contentImageBigVerticalChange.onclick = () => {
    const images = document.querySelectorAll('img, source');
    images.forEach((image) => {
      if (image.src) {
        image.src = 'https://i.ibb.co/16RqjPP/500-1000.jpg';
      }
      if (image.srcset) {
        image.srcset = 'https://i.ibb.co/16RqjPP/500-1000.jpg';
      }
    });
  };

  // изменение изображения на 1000*500
  contentImageBigHorizontalChange.onclick = () => {
    const images = document.querySelectorAll('img, source');
    images.forEach((image) => {
      if (image.src) {
        image.src = 'https://i.ibb.co/B3h43Nc/1000-500.jpg';
      }
      if (image.srcset) {
        image.srcset = 'https://i.ibb.co/B3h43Nc/1000-500.jpg';
      }
    });
  };

  // удаление фонов
  bgImageRemove.onclick = () => {
    const allNodes = [...document.body.querySelectorAll('*')];
    allNodes.forEach((node) => {
      node.style.backgroundImage = 'none';
    });
  };

  imageInfo.onclick = () => {
    const images = [...document.querySelectorAll('img')];

    if (images.length) {
      let pictureCount = 0;
      let mediaCount = 0;
      let webpCount = 0;
      let retinaCount = 0;
      let imagesCount = 0;

      images.forEach((image) => {
        imagesCount++;
        const parent = image.parentNode;
        if (parent.nodeName == 'PICTURE') {
          pictureCount++;

          let children = [...parent.childNodes].filter(onlySource);

          // проверяем детей на кадрирование.
          children.forEach((child) => {
            if (child.media !== '') {
              mediaCount++;
            }
            return;
          });

          // проверяем детей на webp.
          children.forEach((child) => {
            if (child.type == 'image/webp') {
              webpCount++;
            }
            return;
          });

          // проверяем детей на ретину.
          children.forEach((child) => {
            if (child.srcset !== '') {
              retinaCount++;
            }
            return;
          });

          // проверяем детей на ретину.
          children.forEach((child) => {
            child.remove();
          });

        } else {
          if (image.srcset !== '') {
            retinaCount++;
          }
        }
      });

      con.textContent = con.textContent + 'Количество картинок: ' + imagesCount + '\r\n';
      con.textContent = con.textContent + 'Количество picture: ' + pictureCount + '\r\n';
      con.textContent = con.textContent + 'Встречается кадрирование: ' + mediaCount + '\r\n';
      con.textContent = con.textContent + 'Количество webp: ' + webpCount + '\r\n';
      con.textContent = con.textContent + 'Количество ретинизации: ' + retinaCount + '\r\n';
    }
  };

  // функция фильтрация нодам, оставляет только source
  function onlySource(node) {
    return node.nodeName == 'SOURCE';
  }

  // обводка элементов
  outline.onclick = () => {
    let allNodes = [...document.body.querySelectorAll('*')];
    allNodes.forEach((node) => {
      if (!node.classList.contains('ts-panel') && !node.classList.contains('ts-btn') && !node.classList.contains('ts-console')) {
        node.style.outline = '1px solid rgba(231, 46, 139, 1)';
      }
    });
  };

  // скрытие и открытие панели
  const panelBoard = document.querySelector('.ts-panel');

  hide.onclick = () => {
    if (panelBoard) {
      panelBoard.classList.add('ts-panel--close');
    }
  };

  panelBoard.onclick = (event) => {
    if (panelBoard.classList.contains('ts-panel--close') && event.target == panelBoard) {
      panelBoard.classList.remove('ts-panel--close');
    }
  };

  // аналитика по ссылкам
  href.onclick = () => {
    const a = document.querySelectorAll('a');
    const b = document.querySelectorAll('button');

    let hrefCount = 0;
    let hrefEmptyCount = 0;
    let btnCount = 0;
    let btnTypeCount = 0;
    let btnWithoutType = [];

    a.forEach((item) => {
      hrefCount++;
      if (!item.textContent) {
        hrefEmptyCount++;
      }
    });

    b.forEach((item) => {
      if (!item.classList.contains('ts-btn')) {

        btnCount++;
        if (!item.textContent) {
          con.textContent = con.textContent + 'Контент кнопки: пустая.' + item.classList + '\r\n';
        } else {
          con.textContent = con.textContent + 'Контент кнопки: ' + item.innerText + '\r\n';
        }

        if (!item.getAttribute('type')) {
          btnTypeCount++;
          btnWithoutType.push('У кнопки с классами: ' + item.classList + ' не указан тип ' + '\r\n');
        }
      }
    });

    con.textContent = con.textContent + 'Количество ссылок ' + hrefCount + '\r\n';
    con.textContent = con.textContent + 'Количество пустых ссылок ' + hrefEmptyCount + '\r\n';
    con.textContent = con.textContent + 'Количество кнопок ' + btnCount + '\r\n';
    con.textContent = con.textContent + 'Количество кнопок без типа  ' + btnTypeCount + '\r\n' + btnWithoutType.join('');
  };
};
