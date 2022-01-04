const fs = require("fs");

fs.writeFile(
    "cidades.json",
    JSON.stringify({ nome: "Mateus", idade: "23" }),
    () => {}
);

const baixarCidades = async () => {
    try {
        const response = await fetch(
            "https://servicodados.ibge.gov.br/api/v1/localidades/municipios/",
            { method: "GET" }
        );

        const resultado = await response.json();

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
