const fs = require("fs");
const axios = require("axios");

const baixarCidades = async () => {
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/municipios/";

    try {
        const response = await axios.get(url);
        const resultado = response.data;

        let objeto = [];

        resultado.forEach((element) => {
            objeto.push({
                id: element.id,
                nome: element.nome,
                estado: {
                    id: element.microrregiao.mesorregiao.UF.id,
                    nome: element.microrregiao.mesorregiao.UF.nome,
                    sigla: element.microrregiao.mesorregiao.UF.sigla,
                },
                regiao: {
                    id: element.microrregiao.mesorregiao.UF.regiao.id,
                    nome: element.microrregiao.mesorregiao.UF.regiao.nome,
                    sigla: element.microrregiao.mesorregiao.UF.regiao.sigla,
                },
            });
        });

        fs.writeFile("cidades.json", JSON.stringify(objeto), () => {});
    } catch (error) {
        console.log("Aqui deu um error: " + error);
    }
};

baixarCidades();
