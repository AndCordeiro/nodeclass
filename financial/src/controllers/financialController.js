import FinancialModel from '../model/financialModel';

class FinancialController {
  listByIdFinancial = (req, res) => {
    FinancialModel.findById(req.params.id, (err, data) => {
      if (err) {
        return res
          .status(500)
          .send({ output: `Erro ao processar dados -> ${err}` });
      }
      return res.status(200).send({ output: 'Ok', payload: data });
    });
  };

  listFinancial = (req, res) => {
    FinancialModel.find((err, data) => {
      if (err) {
        return res
          .status(500)
          .send({ output: `Erro ao processar dados -> ${err}` });
      }
      return res.status(200).send({ output: 'Ok', payload: data });
    });
  };

  createFinancial = (req, res) => {
    const data = new FinancialModel(req.body);
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
  };

  updateFinancial = (req, res) => {
    FinancialModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, data) => {
        if (err) {
          return res.status(500).send({
            output: `Erro ao processar a atualização-> ${err}`,
          });
        }
        if (!data) {
          return res.status(400).send({
            output: `Não foi possível atualizar -> ${err}`,
          });
        }
        return res.status(202).send({ output: 'Atualizado', payload: data });
      }
    );
  };

  deleteFinancial = (req, res) => {
    FinancialModel.findByIdAndDelete(req.params.id, (err) => {
      if (err) {
        return res
          .status(500)
          .send({ output: `Erro ao tentar apagar -> ${err}` });
      }
      res.status(202).send({});
    });
  };
}

export default FinancialController;
