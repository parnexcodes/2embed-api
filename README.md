
# 2embed-api

Get HLS streams and info from 2embed.to




## Run Locally

Clone the project

```bash
  git clone https://github.com/parnexcodes/2embed-api
```

Go to the project directory

```bash
  cd 2embed-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  cd src
  npm dev
```


## API Reference

#### Get tmdb details

```
  GET /api/details/:type/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `type` | `string` | movie/tv |
| `id` | `string` | tmdb id |

#### Get Episodes

```
  GET /api/episodes/tv/:id/seasons/:season_n_query
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | tmdb id |
| `season_n_query`      | `string` | season number |

#### Get HLS Stream

```
  GET /api/get_source/:type?id=${id}&s=${season_num}&e=${ep_num}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`      | `string` | movie/tv |
| `id`      | `string` | tmdb id |
| `s`      | `string` | **Only for TV** : season number |
| `e`      | `string` | **Only for TV** : episode number |


## Authors

- [@ernestdodz](https://www.github.com/ernestdodz) (Originally made by @ernestdodz)
- [@parnexcodes](https://www.github.com/parnexcodes) (fixed it to work without rabbitstream token)