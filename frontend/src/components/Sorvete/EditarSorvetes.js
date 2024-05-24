import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Barra from "../util/Barra";

const EditarSorvete = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [ mensagem, setMensagem ] = useState("");
  const [ nome, setNome ] = useState("");
  const [ quantidade, setQuantidade ] = useState("");
  const [ preco, setPreco ] = useState("");
  const [ erro, setErro ] = useState("");

  useEffect(() => {
    if (localStorage.getItem('sorvetes') === null)
      localStorage.setItem('sorvetes', "[]");

    const sorvetesLocalStorage = JSON.parse(localStorage.getItem('sorvetes'));
    const sorvete = sorvetesLocalStorage[id];

    if (sorvete) {
      setNome(sorvete.nome);
      setQuantidade(sorvete.quantidade);
      setPreco(sorvete.preco);
    }
  }, [id]);

  function handleNome(e) {
    setNome(e.target.value);
  }

  function handleQuantidade(e) {
    setQuantidade(e.target.value);
  }

  function handlePreco(e) {
    setPreco(e.target.value);
  }

  async function handleEditarSorvete() {
    if (!nome || !quantidade || !preco) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    if (isNaN(Number(quantidade)) || isNaN(Number(preco))) {
      setErro("Quantidade e preço devem ser números válidos.");
      return;
    }

    if (quantidade < 0) {
      setErro("A quantidade não pode ser negativa.");
      return;
    }

    if (preco < 0) {
      setErro("O preço não pode ser negativo.");
      return;
    }

    try {
      const sorvetesLocalStorage = JSON.parse(localStorage.getItem('sorvetes')) || [];
      const updatedSorvetes = [...sorvetesLocalStorage];
      updatedSorvetes[id] = { nome, quantidade, preco };

      localStorage.setItem('sorvetes', JSON.stringify(updatedSorvetes));
      setMensagem("Sorvete editado com sucesso!");

      navigate("/");
    } catch (error) {
      console.error('Erro ao editar o sorvete: ', error);
    }
  };

  function voltar() {
    navigate("/");
  }

  return (
    <div>
      <Barra />
      <h1>Editar Sorvete</h1>
      <form className="container mt-4">
      <div className={`alert ${mensagem ? 'alert-success' : 'd-none'}`} role="alert">
          {mensagem}
        </div>
        <div className={`alert ${erro ? 'alert-danger' : 'd-none'}`} role="alert">
          {erro}
        </div>
        <br />
        <label>Nome do sorvete</label>
        <input type="text" className="form-control" value={nome} onChange={handleNome} />
        <br />
        <label>Quantidade</label>
        <input type="number" className="form-control" value={quantidade} onChange={handleQuantidade} />
        <br />
        <label>Preço</label>
        <input type="number" className="form-control" value={preco} onChange={handlePreco} />
        <br />
        <button type="button" className="btn btn-secondary me-2" onClick={voltar}>Voltar</button>
        <button type="button" className="btn btn-primary" onClick={handleEditarSorvete}>Editar Sorvete</button>
      </form>
    </div>
  )
}

export default EditarSorvete;
