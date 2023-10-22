import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';
import axios from 'axios';

// Тут список пользователей: https://reqres.in/api/users

function App() {
	const [users, setUsers] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [invites, setInvites] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState('');

	React.useEffect(() => {
		axios
			.get('https://reqres.in/api/users')
			.then((user) => setUsers(user.data.data))
			.catch((err) => {
				console.log(err);
				alert('Ошибка ответа сервера! Поробуйте позже.');
			})
			.finally(setIsLoading(false));
	}, []);

	const setSearchV = (e) => {
		setSearchValue(e.target.value);
	};

	const onClickInvite = (id) => {
		if (invites.includes(id)) {
			setInvites((prev) => prev.filter((_id) => _id !== id));
		} else {
			setInvites((prev) => [...prev, id]);
		}
	};
	return (
		<div className="App">
			<Users
				items={users}
				isLoading={isLoading}
				searchValue={searchValue}
				setSearchValue={setSearchV}
				onClickInvite={onClickInvite}
				invites={invites}
			/>
			{/* <Success /> */}
		</div>
	);
}

export default App;
