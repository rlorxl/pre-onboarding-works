# 원티드 프리온보딩 8차 - 1주차 과제

## 주요 리팩토링 내용

- 반복 사용되는 ui를 컴포넌트로 분리하여 재사용성을 높임.
- 컴포넌트에 있던 중복되는 로직을 분리하여 커스텀 훅으로 만들고 컴포넌트가 view를 그리는데에 집중할 수 있도록 함.
- contextAPI와 커스텀 훅을 함께 사용한 store를 추가하여 데이터를 전역 상태로 관리하고 데이터의 단방향 흐름이 되도록 리팩토링.
- Router에서 Private함수를 통한 redirect처리와 url 직접 접근을 방지.

## 리팩토링 전/후 비교

## 1. 디렉토리 구조

### 리팩토링 전

```bash
src
   ├── App.jsx # entrypoint
   ├── App.test.js
   ├── components
   │   └── TodoCard.jsx
   ├── index.css
   ├── index.js
   ├── pages
   │   ├── LoginPage.jsx
   │   ├── MainPage.jsx
   │   └── SignupPage.jsx
   │
   ├── Router
   │   └── Routes.jsx
   └── api
       ├── api.js
       └── instance.js
```

### 리팩토링 후

```bash
src
   ├── App.jsx # entrypoint
   ├── App.test.js
   ├── components
   │   ├── auth/ui
   │   │   ├── Input.jsx
   │   │   ├── Button.jsx
   │   │   └── FormContainer.jsx
   │   └── todo
   │       └── TodoCard.jsx
   ├── index.css
   ├── index.js
   ├── pages
   │   ├── LoginPage.jsx
   │   ├── MainPage.jsx
   │   └── SignupPage.jsx
   │
   ├── Router
   │   └── Routes.jsx
   ├── hooks
   │   ├── useAuth.jsx
   │   ├── useHttp.jsx
   │   └── useValidate.jsx
   ├── store
   │   ├── todoContext.jsx
   │   └── todoProvider.jsx
   └── api
       ├── api.js
       └── instance.js
```

## 2. 주요 코드

1. 비동기http요청 후 response.data를 store에 저장.

```jsx
const useHttp = () => {
  const sendRequest = useCallback(async (config, applyFunc) => {
    const { method, payload, todoId } = config;

    const API_ROUTE = apiRoute[method];

    try {
      const response = todoId ? await API_ROUTE(todoId, payload) : await API_ROUTE(payload);
      applyFunc(response.data);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  return { sendRequest };
};
```

2. 메인페이지 마운트시 contextAPI를 통한 api요청, todoProvider의 get함수를 통한 코드 통합, 간소화.

```jsx
// Mainpage.jsx
const { getSyncTodos, createTodo, todosData } = useContext(TodoContext);
// {...}
useEffect(() => {
  getSyncTodos();
}, []);

// todoProvider.js
const getSyncTodos = useCallback(async () => {
  await sendRequest({ method: 'GET' }, setTodo.bind(null, { method: 'GET' }));
}, [sendRequest, setTodo]);
```

3. useAuth로 회원가입/로그인 요청에 대한 처리.

```jsx
const useAuth = () => {
  const navigate = useNavigate();

  const auth = useCallback(
    async (request, message) => {
      const { name, formData: enteredFormData, direction } = request;

      const API = name === 'signIn' ? signAPI.goSignIn : signAPI.goSignUp;

      try {
        const { data } = await API(enteredFormData);

        if (!data) {
          alert('error: 로그인 요청 실패');
          return;
        }

        name === 'signIn' && localStorage.setItem('token', data.access_token);

        message && alert(message);

        navigate(direction);
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    [navigate]
  );

  return {
    auth,
  };
};
```
