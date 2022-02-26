<?php

namespace App\Http\Controllers;

use App\Exceptions\Response\BadParameterValueException;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use \Illuminate\Http\JsonResponse;


class TestController extends Controller
{


    public function test(): JsonResponse
    {
        $data = DB::table('users')
            ->select('*')
            ->get()
            ->toArray();


        return response()->json([
            'data' => $data
        ]);
    }

    public function auth(Request $params)
    {
        var_dump($params->all());
        die();
        $select = $this->db->prepare("SELECT users.id, password, roles.name as namerole, roles.id as roleid, token,
                                        users.isactive, users.login, organization.name as org, organization.id as orgid
                                        FROM users
                                            INNER JOIN userorg ON users.id = userorg.userid
                                            INNER JOIN organization ON userorg.orgid = organization.id
                                            INNER JOIN roles ON organization.role = roles.id
                                        WHERE login = :login");
        $res = $select->execute(['login' => $params->get('login')]);

        if (!$res) throw new Exception(implode('-', $select->errorInfo()));
        if ($select->rowCount() > 1) throw new Exception('Database corrupted: multiple users found');
        // if ($select->rowCount() === 0) throw new Exception('User not found');

        $user = $select->fetch(PDO::FETCH_ASSOC);

        if ($select->rowCount() === 1 && password_verify($params->get('password'), $user['password'])) {
            if ($user['roleid'] == 3) {
                $select = $this->db->prepare("SELECT name, role, permissionid, insurance
                                                FROM organization
                                                    INNER JOIN orgpermissions ON orgpermissions.orgid = organization.id
                                                    INNER JOIN permissions ON permissions.id = orgpermissions.permissionid
                                                WHERE organization.id = :orgid
                                                AND orgpermissions.isactive = :isactive
                                                AND insurance = :insurance");

                $res = $select->execute([
                    'orgid' => $user['orgid'],
                    'isactive' => TRUE,
                    'insurance' => TRUE,
                ]);

                if (!$res) throw new Exception(implode('-', $select->errorInfo()));
                $user['insurance'] = $select->rowCount() > 0 ? true : false;
            }

            if ($user['isactive']) {
                $this->answer = [
                    'result' => 'success',
                    'id' => $user['id'],
                    'role' => $user['namerole'],
                    'token' => $user['token'],
                    'login' => $user['login'],
                    'org' => $user['org'],
                    'insurance' => $user['insurance'],
                    'limit' => $this->limit_admin = $_SERVER['ENV']['LIMIT_ADMIN_ID'] == $user['id'],

                ];
            } else {
                $this->answer = [
                    'result' => "unconfirmed"
                ];
            }
        } else {
            $this->answer = [
                'result' => "incorrect"
            ];
        }
    }
}
