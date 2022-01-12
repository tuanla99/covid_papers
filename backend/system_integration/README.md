# Love Book - CLB Yeu Sach Bach Khoa

<!--- These are examples. See https://shields.io for others or to customize this set of shields. You might want to include dependencies, project status and licence info here --->
![GitHub repo size](https://img.shields.io/github/repo-size/scottydocs/README-template.md)
![GitHub contributors](https://img.shields.io/github/contributors/scottydocs/README-template.md)
![GitHub stars](https://img.shields.io/github/stars/scottydocs/README-template.md?style=social)
![GitHub forks](https://img.shields.io/github/forks/scottydocs/README-template.md?style=social)
![Twitter Follow](https://img.shields.io/twitter/follow/scottydocs?style=social)

Cung cấp các chức năng: tìm kiếm, xem bài báo theo chủ đề

## Prerequisites

Before you begin, ensure you have met the following requirements:
<!--- These are just example requirements. Add, duplicate or remove as required --->
* You have installed the latest version of Php, Laravel, composer and mysql
* You have a `<Windows/Linux/Mac>` machine. 
* You have read [Documentation Laravel](https://laravel.com/docs/8.x).

## Installing

To install, follow these steps:

Linux and macOS:
```
npm install 
composer install 
```
Next, run MySQL and config environment in .env  ![img.png](img.png)
```
cp .env.example .env
php artisan key:generate
php artisan config:clear
php artisan config:cache
```

Then run: 
```
php artisan migrate
```
Windows:
```
<install_command>
```
## Using

To use, follow these steps:

```
php artisan serve
```
Start using at http://127.0.0.1:8000/
See Api Document at https://app.swaggerhub.com/apis/tuanla99/system_integration/1.0.0-oas3#/news/get_news_index

## Contributing
<!--- If your README is long or you have some specific process or steps you want contributors to follow, consider creating a separate CONTRIBUTING.md file--->
To contribute, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Contributors

Thanks to the following people who have contributed to this project:

* [@tuanla99](https://github.com/tuanla99)  📖
* [@trongtrontu]() 🐛

[comment]: <> (You might want to consider using something like the [All Contributors]&#40;https://github.com/all-contributors/all-contributors&#41; specification and its [emoji key]&#40;https://allcontributors.org/docs/en/emoji-key&#41;.)

## Contact

If you want to contact me you can reach me at <your_email@address.com>.

## License
<!--- If you're not sure which open license to use see https://choosealicense.com/--->

This project uses the following license: [<license_name>](<link>).
