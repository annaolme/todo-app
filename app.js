var todos = [];
var currentFilter = 'all';

function addTodo() {
    var input = document.getElementById('todo-input');
    var text = input.value.trim();
    if (!text) return;
    todos.push({ text: text, completed: false });
    input.value = '';
    save(); render();
}

function deleteTodo(i) { todos.splice(i, 1); save(); render(); }
function toggleTodo(i) { todos[i].completed = !todos[i].completed; save(); render(); }

function setFilter(f, btn) {
    currentFilter = f;
    var btns = document.querySelectorAll('.filter-btn');
    for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
    btn.classList.add('active');
    render();
}

function clearCompleted() {
    todos = todos.filter(function(t) { return !t.completed; });
    save(); render();
}

function render() {
    var list = document.getElementById('todo-list');
    list.innerHTML = '';
    var filtered = todos;
    if (currentFilter === 'active') filtered = todos.filter(function(t) { return !t.completed; });
    else if (currentFilter === 'completed') filtered = todos.filter(function(t) { return t.completed; });

    if (filtered.length === 0) {
        list.innerHTML = '<li class="empty">No todos yet</li>';
    } else {
        for (var i = 0; i < filtered.length; i++) {
            var idx = todos.indexOf(filtered[i]);
            var li = document.createElement('li');
            li.className = 'todo-item' + (filtered[i].completed ? ' completed' : '');
            li.innerHTML = '<input type="checkbox" ' + (filtered[i].completed ? 'checked' : '') +
                ' onchange="toggleTodo(' + idx + ')">' +
                '<span>' + filtered[i].text + '</span>' +
                '<button class="delete-btn" onclick="deleteTodo(' + idx + ')">×</button>';
            list.appendChild(li);
        }
    }
    var left = todos.filter(function(t) { return !t.completed; }).length;
    document.getElementById('counter').textContent = left + ' item' + (left !== 1 ? 's' : '') + ' left';
}

function save() { localStorage.setItem('todos', JSON.stringify(todos)); }
function load() {
    var s = localStorage.getItem('todos');
    if (s) todos = JSON.parse(s);
    render();
}

document.getElementById('todo-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTodo();
});
load();
