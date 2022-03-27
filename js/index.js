const todoInput = document.getElementById('todo-input');
const todoInputBar = document.getElementsByClassName('todo-input-bar')[0];
const todoList = document.getElementsByClassName('todo-list')[0];

todoInputBar.focus();

// ---------- clock and calendar feature ----------
async function clock() {
  const calendarDate = document.getElementsByClassName('calendar-date')[0];
  const calendarTime = document.getElementsByClassName('calendar-time')[0];
  calendarDate.innerText = new Date().toLocaleDateString();
  calendarTime.innerText = new Date().toLocaleTimeString();
  setTimeout(clock, 1000);
}

clock();

// ---------- todo input bar size optimization ----------
async function optimizeTodoInputBarSize() {
  const todoInputBarWidthRatio = todoInputBar.textLength / todoInputBar.clientWidth;
  if (todoInputBarWidthRatio > 0.066 && todoInputBar.textLength < 33) {
    const todoInputBarWidth = 50 + 16 * todoInputBarWidthRatio * todoInputBar.textLength;
    todoInputBar.style.width = `clamp(12rem, ${todoInputBarWidth}vw, 80vw)`;
  } else if (todoInputBarWidthRatio > 0.055 && todoInputBar.textLength < 55) {
    const todoInputBarWidth = 50 + 6.6 * todoInputBarWidthRatio * todoInputBar.textLength;
    todoInputBar.style.width = `clamp(12rem, ${todoInputBarWidth}vw, 80vw)`;
  } else if (todoInputBarWidthRatio < 0.044 && todoInputBar.textLength < 44) {
    const todoInputBarWidth = 50 + 5.5 * todoInputBarWidthRatio * todoInputBar.textLength;
    todoInputBar.style.width = `clamp(12rem, ${todoInputBarWidth}vw, 50rem)`;
  } else if (todoInputBarWidthRatio < 0.033 && todoInputBar.textLength < 33) {
    const todoInputBarWidth = 50;
    todoInputBar.style.width = `clamp(12rem, ${todoInputBarWidth}vw, 50rem)`;
  }
}

todoInputBar.addEventListener('input', () => {
  optimizeTodoInputBarSize();
});

// ---------- todo template creation process ----------
function createTodo(todoText) {
  const liItem = document.createElement('li');
  liItem.classList.add('todo');
  liItem.innerText = todoText;

  const divIconsItem = document.createElement('div');
  divIconsItem.classList.add('todo-icons');
  divIconsItem.innerHTML = '<i class="fas fa-trash-alt remove-todo"></i><i class="fas fa-check complete-todo"></i>';

  const divParentItem = document.createElement('div');
  divParentItem.classList.add('todo-item');
  divParentItem.appendChild(liItem);
  divParentItem.appendChild(divIconsItem);

  return divParentItem;
}

// ---------- saving todo list in local storage ----------
const localStoragePrefix = 'DEVMOR_TODO_LIST';

if (localStorage.getItem(localStoragePrefix) === null) {
  const todoListData = [];
  localStorage.setItem(localStoragePrefix, JSON.stringify(todoListData));
}

function saveTodoInLocalStorge(todo) {
  const localStorageData = JSON.parse(localStorage.getItem(localStoragePrefix));
  localStorageData.push(todo);
  localStorage.setItem(localStoragePrefix, JSON.stringify(localStorageData));
}

function removeTodoFromLocalStorge(todo) {
  const localStorageData = JSON.parse(localStorage.getItem(localStoragePrefix));
  localStorageData.splice(localStorageData.indexOf(todo), 1);
  localStorage.setItem(localStoragePrefix, JSON.stringify(localStorageData));
  console.log(localStorageData);
}

// ---------- load all todos into UI ----------
function loadAllTodosFromLocalStorgae() {
  const localStorageData = JSON.parse(localStorage.getItem(localStoragePrefix));
  localStorageData.forEach((todo) => {
    todoList.appendChild(createTodo(todo));
  });
}

loadAllTodosFromLocalStorgae();

// ---------- activating todo remove icons event listener ----------
async function activateRemoveIcons() {
  const allTodoRemoveIcons = todoList.querySelectorAll('.remove-todo');
  allTodoRemoveIcons.forEach((removeIcon) => {
    removeIcon.addEventListener('click', () => {
      removeIcon.parentElement.parentElement.classList.add('removed-todo');
      setTimeout(() => {
        removeIcon.parentElement.parentElement.remove();
        removeTodoFromLocalStorge(removeIcon.parentElement.previousElementSibling.innerText);
      }, 500);
    });
  });
}
activateRemoveIcons();

// ---------- activating todo complete icons event listener ----------
async function activateCompleteIcons() {
  const allTodoCompleteIcons = todoList.querySelectorAll('.complete-todo');
  allTodoCompleteIcons.forEach((completeIcon) => {
    completeIcon.addEventListener('click', () => {
      completeIcon.parentElement.parentElement.classList.toggle('completed-todo');
    });
  });
}
activateCompleteIcons();

// ---------- todo item insertion process ----------
todoInput.addEventListener('submit', (e) => {
  e.preventDefault();
  if (todoInputBar.value.length < 1) return;

  const todoText = todoInputBar.value;
  const createdTodo = createTodo(todoText);
  todoList.appendChild(createdTodo);

  saveTodoInLocalStorge(todoText);

  todoInputBar.value = '';
  todoInputBar.placeholder = 'What\'s next?';

  optimizeTodoInputBarSize();
  todoInputBar.focus();

  // adding event listener for todo item removal and completion
  const insertedTodoRemoveIcon = todoList.children[todoList.children.length - 1].children[1].children[0];

  insertedTodoRemoveIcon.addEventListener('click', () => {
    createdTodo.classList.add('removed-todo');
    setTimeout(() => {
      createdTodo.remove();
      removeTodoFromLocalStorge(todoText);
    }, 500);
  });

  const insertedTodoCompleteIcon = todoList.children[todoList.children.length - 1].children[1].children[1];

  insertedTodoCompleteIcon.addEventListener('click', () => {
    createdTodo.classList.toggle('completed-todo');
  });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0b2RvSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1pbnB1dCcpO1xuY29uc3QgdG9kb0lucHV0QmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndG9kby1pbnB1dC1iYXInKVswXTtcbmNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndG9kby1saXN0JylbMF07XG5cbnRvZG9JbnB1dEJhci5mb2N1cygpO1xuXG4vLyAtLS0tLS0tLS0tIGNsb2NrIGFuZCBjYWxlbmRhciBmZWF0dXJlIC0tLS0tLS0tLS1cbmFzeW5jIGZ1bmN0aW9uIGNsb2NrKCkge1xuICBjb25zdCBjYWxlbmRhckRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjYWxlbmRhci1kYXRlJylbMF07XG4gIGNvbnN0IGNhbGVuZGFyVGltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NhbGVuZGFyLXRpbWUnKVswXTtcbiAgY2FsZW5kYXJEYXRlLmlubmVyVGV4dCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gIGNhbGVuZGFyVGltZS5pbm5lclRleHQgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpO1xuICBzZXRUaW1lb3V0KGNsb2NrLCAxMDAwKTtcbn1cblxuY2xvY2soKTtcblxuLy8gLS0tLS0tLS0tLSB0b2RvIGlucHV0IGJhciBzaXplIG9wdGltaXphdGlvbiAtLS0tLS0tLS0tXG5hc3luYyBmdW5jdGlvbiBvcHRpbWl6ZVRvZG9JbnB1dEJhclNpemUoKSB7XG4gIGNvbnN0IHRvZG9JbnB1dEJhcldpZHRoUmF0aW8gPSB0b2RvSW5wdXRCYXIudGV4dExlbmd0aCAvIHRvZG9JbnB1dEJhci5jbGllbnRXaWR0aDtcbiAgaWYgKHRvZG9JbnB1dEJhcldpZHRoUmF0aW8gPiAwLjA2NiAmJiB0b2RvSW5wdXRCYXIudGV4dExlbmd0aCA8IDMzKSB7XG4gICAgY29uc3QgdG9kb0lucHV0QmFyV2lkdGggPSA1MCArIDE2ICogdG9kb0lucHV0QmFyV2lkdGhSYXRpbyAqIHRvZG9JbnB1dEJhci50ZXh0TGVuZ3RoO1xuICAgIHRvZG9JbnB1dEJhci5zdHlsZS53aWR0aCA9IGBjbGFtcCgxMnJlbSwgJHt0b2RvSW5wdXRCYXJXaWR0aH12dywgODB2dylgO1xuICB9IGVsc2UgaWYgKHRvZG9JbnB1dEJhcldpZHRoUmF0aW8gPiAwLjA1NSAmJiB0b2RvSW5wdXRCYXIudGV4dExlbmd0aCA8IDU1KSB7XG4gICAgY29uc3QgdG9kb0lucHV0QmFyV2lkdGggPSA1MCArIDYuNiAqIHRvZG9JbnB1dEJhcldpZHRoUmF0aW8gKiB0b2RvSW5wdXRCYXIudGV4dExlbmd0aDtcbiAgICB0b2RvSW5wdXRCYXIuc3R5bGUud2lkdGggPSBgY2xhbXAoMTJyZW0sICR7dG9kb0lucHV0QmFyV2lkdGh9dncsIDgwdncpYDtcbiAgfSBlbHNlIGlmICh0b2RvSW5wdXRCYXJXaWR0aFJhdGlvIDwgMC4wNDQgJiYgdG9kb0lucHV0QmFyLnRleHRMZW5ndGggPCA0NCkge1xuICAgIGNvbnN0IHRvZG9JbnB1dEJhcldpZHRoID0gNTAgKyA1LjUgKiB0b2RvSW5wdXRCYXJXaWR0aFJhdGlvICogdG9kb0lucHV0QmFyLnRleHRMZW5ndGg7XG4gICAgdG9kb0lucHV0QmFyLnN0eWxlLndpZHRoID0gYGNsYW1wKDEycmVtLCAke3RvZG9JbnB1dEJhcldpZHRofXZ3LCA1MHJlbSlgO1xuICB9IGVsc2UgaWYgKHRvZG9JbnB1dEJhcldpZHRoUmF0aW8gPCAwLjAzMyAmJiB0b2RvSW5wdXRCYXIudGV4dExlbmd0aCA8IDMzKSB7XG4gICAgY29uc3QgdG9kb0lucHV0QmFyV2lkdGggPSA1MDtcbiAgICB0b2RvSW5wdXRCYXIuc3R5bGUud2lkdGggPSBgY2xhbXAoMTJyZW0sICR7dG9kb0lucHV0QmFyV2lkdGh9dncsIDUwcmVtKWA7XG4gIH1cbn1cblxudG9kb0lucHV0QmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICBvcHRpbWl6ZVRvZG9JbnB1dEJhclNpemUoKTtcbn0pO1xuXG4vLyAtLS0tLS0tLS0tIHRvZG8gdGVtcGxhdGUgY3JlYXRpb24gcHJvY2VzcyAtLS0tLS0tLS0tXG5mdW5jdGlvbiBjcmVhdGVUb2RvKHRvZG9UZXh0KSB7XG4gIGNvbnN0IGxpSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gIGxpSXRlbS5jbGFzc0xpc3QuYWRkKCd0b2RvJyk7XG4gIGxpSXRlbS5pbm5lclRleHQgPSB0b2RvVGV4dDtcblxuICBjb25zdCBkaXZJY29uc0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2SWNvbnNJdGVtLmNsYXNzTGlzdC5hZGQoJ3RvZG8taWNvbnMnKTtcbiAgZGl2SWNvbnNJdGVtLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS10cmFzaC1hbHQgcmVtb3ZlLXRvZG9cIj48L2k+PGkgY2xhc3M9XCJmYXMgZmEtY2hlY2sgY29tcGxldGUtdG9kb1wiPjwvaT4nO1xuXG4gIGNvbnN0IGRpdlBhcmVudEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2UGFyZW50SXRlbS5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0nKTtcbiAgZGl2UGFyZW50SXRlbS5hcHBlbmRDaGlsZChsaUl0ZW0pO1xuICBkaXZQYXJlbnRJdGVtLmFwcGVuZENoaWxkKGRpdkljb25zSXRlbSk7XG5cbiAgcmV0dXJuIGRpdlBhcmVudEl0ZW07XG59XG5cbi8vIC0tLS0tLS0tLS0gc2F2aW5nIHRvZG8gbGlzdCBpbiBsb2NhbCBzdG9yYWdlIC0tLS0tLS0tLS1cbmNvbnN0IGxvY2FsU3RvcmFnZVByZWZpeCA9ICdERVZNT1JfVE9ET19MSVNUJztcblxuaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsU3RvcmFnZVByZWZpeCkgPT09IG51bGwpIHtcbiAgY29uc3QgdG9kb0xpc3REYXRhID0gW107XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvY2FsU3RvcmFnZVByZWZpeCwgSlNPTi5zdHJpbmdpZnkodG9kb0xpc3REYXRhKSk7XG59XG5cbmZ1bmN0aW9uIHNhdmVUb2RvSW5Mb2NhbFN0b3JnZSh0b2RvKSB7XG4gIGNvbnN0IGxvY2FsU3RvcmFnZURhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsU3RvcmFnZVByZWZpeCkpO1xuICBsb2NhbFN0b3JhZ2VEYXRhLnB1c2godG9kbyk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvY2FsU3RvcmFnZVByZWZpeCwgSlNPTi5zdHJpbmdpZnkobG9jYWxTdG9yYWdlRGF0YSkpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVUb2RvRnJvbUxvY2FsU3RvcmdlKHRvZG8pIHtcbiAgY29uc3QgbG9jYWxTdG9yYWdlRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxTdG9yYWdlUHJlZml4KSk7XG4gIGxvY2FsU3RvcmFnZURhdGEuc3BsaWNlKGxvY2FsU3RvcmFnZURhdGEuaW5kZXhPZih0b2RvKSwgMSk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvY2FsU3RvcmFnZVByZWZpeCwgSlNPTi5zdHJpbmdpZnkobG9jYWxTdG9yYWdlRGF0YSkpO1xuICBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2VEYXRhKTtcbn1cblxuLy8gLS0tLS0tLS0tLSBsb2FkIGFsbCB0b2RvcyBpbnRvIFVJIC0tLS0tLS0tLS1cbmZ1bmN0aW9uIGxvYWRBbGxUb2Rvc0Zyb21Mb2NhbFN0b3JnYWUoKSB7XG4gIGNvbnN0IGxvY2FsU3RvcmFnZURhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsU3RvcmFnZVByZWZpeCkpO1xuICBsb2NhbFN0b3JhZ2VEYXRhLmZvckVhY2goKHRvZG8pID0+IHtcbiAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZChjcmVhdGVUb2RvKHRvZG8pKTtcbiAgfSk7XG59XG5cbmxvYWRBbGxUb2Rvc0Zyb21Mb2NhbFN0b3JnYWUoKTtcblxuLy8gLS0tLS0tLS0tLSBhY3RpdmF0aW5nIHRvZG8gcmVtb3ZlIGljb25zIGV2ZW50IGxpc3RlbmVyIC0tLS0tLS0tLS1cbmFzeW5jIGZ1bmN0aW9uIGFjdGl2YXRlUmVtb3ZlSWNvbnMoKSB7XG4gIGNvbnN0IGFsbFRvZG9SZW1vdmVJY29ucyA9IHRvZG9MaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZW1vdmUtdG9kbycpO1xuICBhbGxUb2RvUmVtb3ZlSWNvbnMuZm9yRWFjaCgocmVtb3ZlSWNvbikgPT4ge1xuICAgIHJlbW92ZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICByZW1vdmVJY29uLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdyZW1vdmVkLXRvZG8nKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZW1vdmVJY29uLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgcmVtb3ZlVG9kb0Zyb21Mb2NhbFN0b3JnZShyZW1vdmVJY29uLnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy5pbm5lclRleHQpO1xuICAgICAgfSwgNTAwKTtcbiAgICB9KTtcbiAgfSk7XG59XG5hY3RpdmF0ZVJlbW92ZUljb25zKCk7XG5cbi8vIC0tLS0tLS0tLS0gYWN0aXZhdGluZyB0b2RvIGNvbXBsZXRlIGljb25zIGV2ZW50IGxpc3RlbmVyIC0tLS0tLS0tLS1cbmFzeW5jIGZ1bmN0aW9uIGFjdGl2YXRlQ29tcGxldGVJY29ucygpIHtcbiAgY29uc3QgYWxsVG9kb0NvbXBsZXRlSWNvbnMgPSB0b2RvTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tcGxldGUtdG9kbycpO1xuICBhbGxUb2RvQ29tcGxldGVJY29ucy5mb3JFYWNoKChjb21wbGV0ZUljb24pID0+IHtcbiAgICBjb21wbGV0ZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb21wbGV0ZUljb24ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2NvbXBsZXRlZC10b2RvJyk7XG4gICAgfSk7XG4gIH0pO1xufVxuYWN0aXZhdGVDb21wbGV0ZUljb25zKCk7XG5cbi8vIC0tLS0tLS0tLS0gdG9kbyBpdGVtIGluc2VydGlvbiBwcm9jZXNzIC0tLS0tLS0tLS1cbnRvZG9JbnB1dC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGlmICh0b2RvSW5wdXRCYXIudmFsdWUubGVuZ3RoIDwgMSkgcmV0dXJuO1xuXG4gIGNvbnN0IHRvZG9UZXh0ID0gdG9kb0lucHV0QmFyLnZhbHVlO1xuICBjb25zdCBjcmVhdGVkVG9kbyA9IGNyZWF0ZVRvZG8odG9kb1RleHQpO1xuICB0b2RvTGlzdC5hcHBlbmRDaGlsZChjcmVhdGVkVG9kbyk7XG5cbiAgc2F2ZVRvZG9JbkxvY2FsU3RvcmdlKHRvZG9UZXh0KTtcblxuICB0b2RvSW5wdXRCYXIudmFsdWUgPSAnJztcbiAgdG9kb0lucHV0QmFyLnBsYWNlaG9sZGVyID0gJ1doYXRcXCdzIG5leHQ/JztcblxuICBvcHRpbWl6ZVRvZG9JbnB1dEJhclNpemUoKTtcbiAgdG9kb0lucHV0QmFyLmZvY3VzKCk7XG5cbiAgLy8gYWRkaW5nIGV2ZW50IGxpc3RlbmVyIGZvciB0b2RvIGl0ZW0gcmVtb3ZhbCBhbmQgY29tcGxldGlvblxuICBjb25zdCBpbnNlcnRlZFRvZG9SZW1vdmVJY29uID0gdG9kb0xpc3QuY2hpbGRyZW5bdG9kb0xpc3QuY2hpbGRyZW4ubGVuZ3RoIC0gMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMF07XG5cbiAgaW5zZXJ0ZWRUb2RvUmVtb3ZlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjcmVhdGVkVG9kby5jbGFzc0xpc3QuYWRkKCdyZW1vdmVkLXRvZG8nKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNyZWF0ZWRUb2RvLnJlbW92ZSgpO1xuICAgICAgcmVtb3ZlVG9kb0Zyb21Mb2NhbFN0b3JnZSh0b2RvVGV4dCk7XG4gICAgfSwgNTAwKTtcbiAgfSk7XG5cbiAgY29uc3QgaW5zZXJ0ZWRUb2RvQ29tcGxldGVJY29uID0gdG9kb0xpc3QuY2hpbGRyZW5bdG9kb0xpc3QuY2hpbGRyZW4ubGVuZ3RoIC0gMV0uY2hpbGRyZW5bMV0uY2hpbGRyZW5bMV07XG5cbiAgaW5zZXJ0ZWRUb2RvQ29tcGxldGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNyZWF0ZWRUb2RvLmNsYXNzTGlzdC50b2dnbGUoJ2NvbXBsZXRlZC10b2RvJyk7XG4gIH0pO1xufSk7XG4iXX0=
