import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import cfg from '../config';
import UserModel from '../model/userModel';
import createToken from '../utils/createToken';

class UserController {
  createUser = (req, res) => {
    bcrypt.hash(req.body.password, parseInt(cfg.salt, 10), (err, result) => {
      if (err) {
        return res.status(500).send({
          output: `Erra ao tentar gerar a senha -> ${err}`,
        });
      }
      req.body.password = result;
      req.body.apikey = uuidv4();

      const data = new UserModel(req.body);
      data
        .save()
        .then((result) => {
          res.status(201).send({
            output: 'Cadastro realizado',
            payload: result,
          });
        })
        .catch((err) =>
          res.status(500).send({ output: `Erro ao cadastrar -> ${err}` })
        );
    });
  };

  updateUserPassword = (req, res) => {
    UserModel.findById(req.params.id, (err, result) => {
      if (err) {
        return res.status(500).send({
          output: `Erro ao tentar trocar a senha -> ${err}`,
        });
      }
      bcrypt.compare(req.body.currentPassword, result.password, (err, same) => {
        if (err) {
          return res.status(500).send({
            output: `Erro ao trocar a senha ->${err}`,
          });
        }
        if (!same)
          return res.status(400).send({ output: 'Senha atual inválida' });
        bcrypt.hash(
          req.body.newPassword,
          parseInt(cfg.salt, 10),
          (err, result) => {
            if (err) {
              return res.status(500).send({
                output: `Erra ao tentar gerar a nova senha -> ${err}`,
              });
            }
            UserModel.findByIdAndUpdate(
              req.params.id,
              { password: result },
              { new: true },
              (err, data) => {
                if (err) {
                  return res.status(500).send({
                    output: `Erro ao processar a atualização -> ${err}`,
                  });
                }
                if (!data) {
                  return res.status(400).send({
                    output: `Não foi possível atualizar nova senha -> ${err}`,
                  });
                }
                return res.status(202).send({
                  output: 'Nova senha atualizada',
                  payload: data,
                });
              }
            );
          }
        );
      });
    });
  };

  deleteUser = (req, res) => {
    UserModel.findByIdAndDelete(req.params.id, (err) => {
      if (err) {
        return res
          .status(500)
          .send({ output: `Erro ao tentar apagar -> ${err}` });
      }
      res.status(202).send({});
    });
  };

  authenticated = (req, res) => {
    UserModel.findOne({ username: req.body.username }, (err, result) => {
      if (err) {
        return res
          .status(500)
          .send({ output: `Erro ao tentar localizar -> ${err}` });
      }
      if (!result) {
        return res.status(400).send({ output: 'Usuário não localizado' });
      }
      bcrypt.compare(req.body.password, result.password, (err, same) => {
        if (err) {
          return res
            .status(500)
            .send({ output: `Erro ao validar a senha ->${err}` });
        }
        if (!same) return res.status(400).send({ output: 'Senha inválida' });

        const tokenGenerated = createToken(
          result._id,
          result.user,
          result.email
        );
        return res.status(200).send({
          output: 'Autenticado',
          message:
            'Cadastre os dados financeiros em: http://localhost:3001/financial/register',
          token: tokenGenerated,
          apikey: result.apikey,
        });
      });
    });
  };
}

export default UserController;
