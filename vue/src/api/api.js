import axios from 'axios';
let BaseUrl = 'http://localhost:5002/';

export const Login = (params) => {
	return axios({
		method: 'Post',
		url: BaseUrl + 'Users/action',
		params: params,
	})
		.then((res) => res.data)
		.catch((error) => console.log(error));
};

export const AddUsers = (params) => {
	console.log(params);
	return axios({
		method: 'Post',
		url: BaseUrl + 'Users',
		data: params,
	})
		.then((res) => res.data)
		.catch((error) => console.log(error));
};

export const GetUserData = (Params) => {
	return axios({
		method: 'Get',
		url: BaseUrl + 'Programs/ShowPrograms',
		params: {
			U_name: Params,
		},
	});
};

export const GetAdminData = (Params) => {
	return axios({
		method: 'Get',
		url: BaseUrl + 'Programs/Show',
		params: {
			R_name: Params,
		},
	});
};

export const GetManageData = (Params) => {
	return axios({
		method: 'Get',
		url: BaseUrl + 'Programs/Show',
		params: {
			R_name: Params,
		},
	});
};

export const GetAgreeData = (Params) => {
	return axios({
		method: 'Get',
		url: BaseUrl + 'Programs/ShowExamined',
		params: {
			R_name: Params,
		},
	});
};

export const PassData = (Params) => {
	return axios({
		method: 'Post',
		url: BaseUrl + 'Programs/Pass',
		data: Params,
	});
};

export const RejectData = (Params) => {
	return axios({
		method: 'Post',
		url: BaseUrl + 'Programs/Reject',
		data: Params,
	});
};
export const Upload = (From) => {
	return axios({
		method: 'Post',
		url: BaseUrl + 'Programs',
		data: From,
	});
};

export const GetUserFile = (id) => {
	return axios({
		method: 'Get',
		url: BaseUrl + 'Programs/DownloadFile',
		params: { Id: id },
	});
};

export const DeleteData = (Params) => {
	return axios({
		method: 'delete',
		url: BaseUrl + 'Programs',
		params: Params,
	});
};
//以下代码由T4模板生成

//T4模板生成结束
