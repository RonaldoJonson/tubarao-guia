const PORT = process.env.PORT || 3000;

const twilio = require('twilio')

const MessagingResponse = twilio.twiml.MessagingResponse
const express = require('express')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:false}))

app.post('/webhook', (req, res) => {
    const msg = req.body.Body.toLowerCase();
    const twiml = new MessagingResponse();

    if(msg.includes('oi') || msg === 'olá' || msg === 'Bom dia')    
        twiml.message(`Olá, sou o *Tubarão Zap*. Vou te
        fornecer alguns dados sobre a rota da viagem e dicas
        de locais pra parar e descansar um pouco. Pra onde vamos?`);
    else if(msg === 'paradas')
        twiml.message(GetPlacesOnRoute(msg));
    else if(msg.includes('lugar') || msg.includes('onde estou'))
        twiml.message(GetPlaceInfo(msg));
    else if(msg.includes('rota'))
        twiml.message(GetRoute());
    else if(msg.includes('ducha') || msg.includes('banh'))
        twiml.message(`
        Nome: Posto Bahia
        Endereço: Km 10
        Nota: 2
        BANHEIRO: Temos de graça
        `);
    else if(msg.includes('quanto tempo') && (msg.includes('parada') || msg.includes('hotel')))
        twiml.message(`
        faltam 2 horas até a proxima parada
        `);
    else if(msg.includes('quanto tempo') && (msg.includes('destino') || msg.includes('final')))
        twiml.message(`
        faltam 4 horas para terminar sua corrida
        `);
    else if(msg.includes('parada') && msg.includes('destino'))
        twiml.message(`
        12 outras paradas até seu destino
        `);
    else if(msg.includes('pedagio'))
        twiml.message(`
        tem 2 pedagios no caminho nos valores de R$3,25 e R$3,00
        `);
    else if(msg.includes('dormir') && msg.includes('seguro')){
        `
        Nome: Hotel e restaurante Marco
        Endereço: Km 35
        Nota: 4
        QUARTO: Quartos caros
        `       
    }else if(msg.includes('dormir') || msg.includes('barato')){
        `
        Nome: Motel Dever
        Endereço: Km 70
        Nota: 3
        QUARTO: Quartos baratos
        `       
    }
    else if(msg.includes('dormir'))
        twiml.message(`
        Nome: Hotel e restaurante Marco
        Endereço: Km 35
        Nota: 4
        QUARTO: Quartos caros

        Nome: Motel Dever
        Endereço: Km 70
        Nota: 3
        QUARTO: Quartos baratos
       `);
    else if(msg.includes('mecanico') || msg.includes('oficina'))
        twiml.message(`
        Nome: Peças do Jão
        Endereço: Km 90
        Nota: 5
        PREÇO: Excelente 

        Nome: Motel Dever
        Endereço: Km 70
        Nota: 3
        QUARTO: Quartos baratos
       `);
    else if(msg.includes('descontos') || msg.includes('promo'))
       twiml.message(`
       Faça revisão na Loja Peças do Jão, Km 90 com um desconto de R$15
       patrocinado pelo: ⭐ Posto Sakamoto
      `);
    else if(msg.includes('comprar') && msg.includes('lubrificante'))
      twiml.message(`
        Nome: Peças do Jão
        Endereço: Km 90
        Nota: 5
        PREÇO: Excelente 

        compre com *desconto* pratrocinado pelo: ⭐ Posto Sakamoto
     `);
    else if(msg.includes('comprar') && msg.includes('peças'))
      twiml.message(`
        Nome: Peças do Jão
        Endereço: Km 90
        Nota: 5
        PREÇO: Excelente 
     `);
    else if(msg.includes('dica'))
      twiml.message(`
        Posto ipiranga está com promoção!!
     `);
    else if(msg.includes('de risco'))
     twiml.message(`
       Zona de risco em duas horas, recomendamos evitar esse caminho até o amanhacer!
    `);
    else
        twiml.message(`${helpMessage}`);

    res.send(twiml.toString());
})

app.listen(PORT, () => console.log('application running on 3000'));


const helpMessage = `
    COMANDOS QUE VOCÊ PODE TESTAR:
    rota = te mostra alguns dos melhores locais em sua rota
    onde estou/aqui = te mostra informaçoes do seu local atual
    banho = lugares proximos para tomar banho
    dicas = descubra descontos e promoções
    `

function GetPlaceInfo(message)
{
    place = {
        name:"Posto Ipiranga",
        address: "Km 50",
        grade: "1",
        type: "PONTO DE PARADA",
        verified: 32,
        tags:[
            "COMIDA: Comida cara",
            "ATENDIMENTO: Não gostam muito de caminhoneiros",
            "SEGURANÇA: Muito bom"
        ],
    };

    return `
    ${place.name} - ${place.type} COM:

    • ${place.tags[0]}
    • ${place.tags[1]}
    • ${place.tags[2]} 

    NOTA: ${place.grade} 

    ⭐ VERIFICADO POR OUTROS ${place.verified} CAMINHONEIROS!
    `
}

function GetPlacesOnRoute(message)
{
    const response = `
        LOCAIS NA SUA ROTA:
        
        Nome: Posto Bahia
        Endereço: Km 10
        Nota: 2
        BANHEIRO: Temos de graça

        Nome: Posto Ipiranga
        Endereço: Km 50 
        Nota: 3
        SEGURANÇA: Muito bom"

        Nome: Clinica de Fisioterapia
        Endereço: Km 35
        Nota: 4
        ATENDIMENTO: Pessoal bacana"
    `

    return response;
}

function GetRoute()
{
    const response = `
        MINHA ROTA:
        
        Inicio: Km 10

        Endereço: Km 50 

        Endereço: Km 35

        Endereço: Km 60

        Destino: Km 85
    `

    return response;
}

const twilioClient = twilio(
    `${ACc617803dbf1f466}${dc86c41a4eb4075e3}`,
    `${e3157eede15a2a793705}${b11406e5b63b}`
)
