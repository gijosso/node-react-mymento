import * as ms from 'mysql';
import * as uuid from 'uuid';
import * as sha1 from 'sha1';


import resp from './resp';


export default class Dbi {
    public connection: ms.IConnection;

    init(host: string, port: number, database: string, user: string, password: string): boolean {
        this.connection = ms.createConnection({
            "host": host,
            "port": port,
            "database": database,
            "user": user,
            "password": password
        });
        this.connection.connect(function (err) {
            if (err) {
                console.error(`Connection configuration failed: ${err}`);
                return false;
            }
        });
        return true;
    }

    mymento(): boolean {
        return this.init('localhost', 3306, 'mymento', 'root', '');
    }


    getRandPhotoById(callback){
        this.connection.query('SELECT * FROM photo LIMIT 10', [uuid], function (err, rows, fields) {
            return callback(resp.generate(rows, "User's photos selection", err));
        });
    }

    /* USER */
    getNUserById(callback) {
        this.connection.query('SELECT * FROM user', function (err, rows, fields) {
            return callback(resp.generate(rows, "User selection by id", err));
        });
    }


    getUserById(uuid: string, callback) {
        this.connection.query('SELECT * FROM user WHERE user.uuid = ? ORDER BY id', [uuid], function (err, rows, fields) {
            return callback(resp.generate(rows, "User selection by id", err));
        });
    }

    getUserId(uuid: string, callback) {
        this.connection.query('SELECT * FROM user WHERE uuid = ?', [uuid], function (err, rows, fields) {
            if (rows.length > 0) {
                return callback(rows[0].id);
            } else {
                return callback();
            }
        });
    }

    isLogged(uuid: string, callback) {
        this.connection.query('SELECT * FROM user WHERE uuid = ?', [uuid], function (err, rows, fields) {
            return callback(rows.length > 0);
        });
    }

    logUser(req, callback) {
        if (!req.body.password || !req.body.username) {
            return callback(resp.generate([], "User login", "You must fill all the values"));
        }
        this.connection.query('SELECT * FROM user WHERE username = ? AND password = ?',
            [req.body.username, sha1(req.body.password)],
            function (err, rows, fields) {
                if (err || rows.length === 0) {
                    return callback(resp.generate([], "Invalid combination password/user", "Invalid combination password/user"));
                }
                req.session.uuid = rows[0].uuid;
                return callback(resp.generate([{"uuid": rows[0].uuid, "id": rows[0].id}], "User log", err));
            });
    }

    insertUser(req, callback) {
        if (!req.body.password || !req.body.confpassword ||
            !req.body.username) {
            return callback(resp.generate([], "User insertion", "You must fill all the value"));
        }
        if (req.body.password === req.body.confpassword) {
            this.connection.query('INSERT INTO user' +
                '(username,password,firstname,lastname,uuid) VALUES(?,?,?,?,?)',
                [req.body.username,
                    sha1(req.body.password),
                    req.body.firstname,
                    req.body.lastname,
                    uuid.v1()],
                function (err, rows, fields) {
                    return callback(resp.generate(rows, "User insertion", err));
                });
        }
        else {
            return callback(resp.generate([], "User insertion", "Password don't match"));
        }
    }

    getUserPhotoById(uuid: string, callback) {
        this.connection.query('SELECT photo.* FROM photo JOIN user ON user.id = photo.user_id WHERE user.uuid = ?', [uuid], function (err, rows, fields) {
            return callback(resp.generate(rows, "User's photos selection", err));
        });
    }

    modifyUser(req, callback) {
        if (!req.body.password || !req.body.confpassword ||
            !req.body.username) {
            return callback(resp.generate([], "User modification", "You must fill all the value"));
        }
        if (req.body.password === req.body.confpassword) {
            this.connection.query('UPDATE user SET username=?, password=?, firstname=?, lastname=? WHERE id=?',
                [req.body.username,
                    sha1(req.body.password),
                    req.body.firstname,
                    req.body.lastname,
                    req.body.id],
                function (err, rows, fields) {
                    return callback(resp.generate(rows, "User modification", err));
                });
        }
        else {
            return callback(resp.generate([], "User modification", "Password don't match"));
        }
    }

    /* PHOTO */
    getPhotoById(id: number, callback) {
        this.connection.query('SELECT * FROM photo WHERE id = ?', [id], function (err, rows, fields) {
            return callback(resp.generate(rows, "Photo selection", err));
        });
    }

    insertPhoto(name: string, id: number, link: string, visibility: number, country: string, city: string, callback) {
        this.connection.query('INSERT INTO photo' +
            '(user_id,link,visibility,name,country,city) VALUES(?,?,?,?,?,?)',
            [id,
                link,
                visibility,
                name,
                country,
                city],
            function (err, rows, fields) {
                return callback(resp.generate(rows, "Photo is added", err));
            });
    }

    deletePhoto(id: number, callback) {
        this.connection.query('DELETE FROM photo WHERE photo.id = ?', [id], function (err, rows, fields) {
            return callback(resp.generate(rows, "Photo deletion", err));
        });
    }

    /* ALBUM */
    getAlbumById(id: number, callback) {
        this.connection.query('SELECT * FROM album ORDER BY id = ?', [id], function (err, rows, fields) {
            return callback(resp.generate(rows, "User selection by id", err));
        });
    }

    getAlbumByUserId(id: number, callback) {
        this.connection.query('SELECT * FROM album WHERE user_id = ?', [id], function (err, rows, fields) {
            return callback(resp.generate(rows, "User selection by user_id", err));
        });
    }

    getAlbumByAlbumId(id: number, callback) {
        this.connection.query('SELECT * FROM photo WHERE id IN (SELECT photo_id FROM album_photo WHERE album_id = ?)', [id], function (err, rows, fields) {
            return callback(resp.generate(rows, "User selection by album_id", err));

        });
    }

    insertNewAlbum(id: number,name :string,  callback) {
        this.connection.query('INSERT INTO album(user_id, link,name, expire)' +
        ' VALUES(?,?,?,?)',
            [id, uuid.v1(), name,'2018-06-16'],
            function (err, rows, fields) {
                return callback(resp.generate(rows, "Album is added", err));
            });
    }

    getAlbumPhotoById(id: number,uuid: string, callback) {
        let that = this;
        this.connection.query('SELECT photo.* FROM photo JOIN album_photo ON album_photo.photo_id = photo.id WHERE album_photo.album_id = ?', [id], function (err, rows, fields) {
            let val = rows;
            that.connection.query('SELECT * FROM album JOIN user on album.user_id = user.id WHERE album.id = ? AND user.uuid = ?',[id,uuid], function (err, rows, fields) {
                if (rows.length > 0)
                    return callback(resp.generate(val, "logged", err));
                else {
                    return callback(resp.generate(val, "unlogged", err));
                }
            });
        });
    }

    insertPhotoAlbum(idAlbum: number, link: string, callback) {
        let that = this;
        console.log(link)
        this.connection.query('SELECT * FROM photo WHERE link = ?', [link], function (err, rows, fields) {
            console.log(rows);
            console.log(err);
            let id = rows[0].id;
            that.connection.query('INSERT INTO album_photo' +
                '(album_id,photo_id) VALUES(?,?)'
                , [idAlbum, id], function (err, rows, fields) {
                    return callback(resp.generate(rows, "Album photos insert", err));
                });
        });
    }
}

export let dbi = new Dbi();
dbi.mymento();
