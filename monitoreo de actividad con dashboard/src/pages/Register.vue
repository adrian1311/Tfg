<template>
<div>
  <div class="row">
    <div class="col-sm-11 border border-success m-4 rounded-lg bg-dark">
      <div class="row justify-content-center mt-2">
        <label class="font-weight-bold text-white">INFORMACIÓN BÁSICA DEL RESIDENTE</label>
      </div>
      <div class="row justify-content-center mt-2">
        <div class="col-sm-2 text-center">
          <img v-bind:src="'data:image/jpg;base64,'+base64encodedImage" class="mt-3 ml-2 rounded-circle" style="height: 12rem; width: 10rem">
        </div>
        <div class="col-sm-10">
          <div class="row justify-content-center mt-2">
            <div class="col-sm-6">
              <div class="input-group input-group">
                <span class="input-group-text text-center">Nombre</span>
                <input type="text" v-model="firstName"  class="form-control text-dark">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="input-group input-group">
                <span class="input-group-text text-center">Apellido</span>
                <input type="text" v-model="lastName"  class="form-control text-dark">
              </div>
            </div>

          </div>
          <div class="row justify-content-center mt-2">
            <div class="col-sm-6">
              <div class="input-group input-group">
                <span class="input-group-text text-center">Género
                  <img class="ml-1" src="@/assets/img/genero-removebg-preview.png" style="height: 1rem; width: 1rem">
                </span>
                <select class="form-control text-dark text-center" v-model="gender" >
                  <option value="male">Hombre</option>
                  <option value="female">Mujer</option>
                </select>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="input-group input-group">
                <span class="input-group-text text-center">Altura (cm)
                  <img class="ml-1" src="@/assets/img/altura-removebg-preview.png" style="height: 1rem; width: 1rem">
                </span>
                <input type="text" v-model="height"   class="form-control text-dark text-center">
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-sm-6">
              <div class="input-group input-group-">
                <span class="input-group-text text-center">Peso (kg)
                  <img class="ml-1" src="@/assets/img/peso-removebg-preview.png" style="height: 1rem; width: 1rem">
                </span>
                <input type="text" v-model="weight"  class="form-control text-dark text-center">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="input-group input-group">
                <span class="input-group-text text-center">Fecha de nacimiento   <img class="ml-1" src="@/assets/img/fecha-removebg-preview.png" style="height: 1rem; width: 1rem">
                </span>
                <input type="date" v-model="age"  class="form-control text-dark text-center">
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-sm-6">
              <div class="input-group input-group">
                <span class="input-group-text text-center">Objetívo de pasos diários
                  <img class="ml-1" src="@/assets/img/paos-removebg-preview.png" style="height: 1rem; width: 1rem">
                </span>
                <input type="text"  v-model="estimetedSteps"  class="form-control text-dark text-center">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="input-group input-group">
                <span class="input-group-text text-center">Necesita ayuda ?
                  <img class="ml-1" src="@/assets/img/ayuda-removebg-preview.png" style="height: 1rem; width: 1rem">
                </span>
                <select class="form-control text-dark text-center" v-model="needHelp" >
                  <option value="no">No</option>
                  <option value="yes">Si</option>
                </select>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div class="row justify-content-center">
        <img style="" :src="image" alt="">
        <input @change="handleImage" class="custom-input" type="file" accept="image/*">
      </div>

      <div class="row justify-content-center mt-2">
        <div class="col-sm-12">
          <div class="form-group">
            <span class="input-group-text text-center">Información adicional sobre el residente</span>
            <textarea class="form-control text-dark" v-model="notes"  rows="3"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-11 border border-success m-4 rounded-lg bg-dark">
      <div class="row justify-content-center mt-2">
        <label class="font-weight-bold text-white">APTITUD FÍSICA DEL RESIDENTE</label>
      </div>
      <div class="row justify-content-center mt-2">
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Sentarse/levantarse (segundos)
             <img class="ml-1" src="@/assets/img/info-removebg-preview.png" data-toggle="tooltip" data-placement="top" title="Sentarse y levantarse de una silla durante 30 s. Propósito: valorar la fuerza-resistencia de los músculos extensores de las rodillas y las caderas, responsables de fallos al andar y de las caídas. Valoración: número de levantadas completas que pueden realizar con los brazos cruzados por delante del pecho durante 30 s. El sujeto parte desde la posición de sentado. Zona de riesgo: menos de 8 levantadas completas (varones y mujeres)" style="height: 2rem; width: 2rem">
            </span>
            <input type="text" v-model="sitUp"  class="form-control text-center">
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Flexiones codos (nº de repeticiones)
            <img class="ml-1" src="@/assets/img/info-removebg-preview.png" data-toggle="tooltip" data-placement="top" title="
Flexión y extensión de codos con mancuernas durante 30 s en posición de sentado en una silla. Propósito: valorar la fuerza-resistencia de la musculatura del brazo y el hombro, tan necesaria para desarrollar tareas cotidianas que involucran levantamientos, transportes,mantenimiento de pesos, etc. Valoración: número de flexiones y extensiones de codos que pueden ser completadas en 30 s, movilizando una mancuerna de 2,30 kg para mujeres y de 4 kg para varones.Se valoran los 2 miembros.– Zona de riesgo: menos de 11 flexiones/extensiones completas (varones y mujeres)." style="height: 2rem; width: 2rem">
            </span>
            <input type="text" v-model="elbowFlexion"  class="form-control text-center">
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Caminata (metros recorridos)
            <img class="ml-1" src="@/assets/img/info-removebg-preview.png" data-toggle="tooltip" data-placement="top" title=" Marcha durante 6 min. Propósito: evaluar la capacidad aeróbica, que es un factor muy importante para caminar, subir escaleras, ir de compras, hacer turismo, etc. Valoración: número de metros que pueden ser realizados en 6 min alrededor de una pista. Zona de riesgo: menos de 320 m para varones y mujeres" style="height: 2rem; width: 2rem">
            </span>
            <input type="text" v-model="walks"   class="form-control text-center">
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Marcha estacionaria (nº de pasos
            <img class="ml-1" src="@/assets/img/info-removebg-preview.png" data-toggle="tooltip" data-placement="top" title="  Step-test durante 2 min. Propósito: evaluar la capacidad aeróbica. Alternativa al test aeróbico de marcha de 6 min, cuando limitaciones de espacio o tiempo impidan realizarlo. Valoración: número de pasos completos realizados durante 2 min, llegando cada rodilla a un punto intermedio entre la rótula y la espina ilíaca anterosuperior. Se puntúa el número de veces que la rodilla derecha alcanza la altura requerida. Zona de riesgo: menos de 60 pasos para varones y mujeres." style="height: 2rem; width: 2rem">
            </span>
            <input type="text" v-model="march"  class="form-control text-center">
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Flexión del tronco (cm, +/–)
            <img class="ml-1" src="@/assets/img/info-removebg-preview.png" data-toggle="tooltip" data-placement="top" title="Flexibilidad de la cadera. Propósito: valorar la flexibilidad de la musculatura posterior de las piernas y del tronco, zonas muy importantes para un adecuado patrón de la deambulación y para diferentes tareas de movilidad, tales como entrar y salir de la bañera, de un coche, subir al autobús, etc. Valoración: desde la posición de sentado en la parte delantera de una silla y con una pierna extendida, tratar de alcanzar con los dedos de la mano los dedos del pie. Se evalúa la distancia alcanzada por el dedo medio en centímetros. Zona de riesgo: mujeres a partir de 5 cm y varones a partir de 10 cm." style="height: 2rem; width: 2rem">
            </span>
            <input type="text"  v-model="trunkFlexion"  class="form-control text-center">
          </div>
        </div>
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Flexibilidad hombros (cm, +/–)
            <img class="ml-1" src="@/assets/img/info-removebg-preview.png" data-toggle="tooltip" data-placement="top" title="Alcanzar las manos tras la espalda. Propósito: valorar la flexibilidad del hombro, tan importante en tareas como peinarse, vestirse, alcanzar objetos, asearse, etc. Valoración: pasando una mano por encima del hombro y la otra por la espalda, medir la distancia que hay entre los dedos medios extendidos. Valorar los dos miembros.Zona de riesgo: mujeres a partir de 5 cm y varones a partir de 10 cm" style="height: 2rem; width: 2rem">
            </span>
            <input type="text"  v-model="shouldersFlexion"  class="form-control text-center">
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-sm-6">
          <div class="input-group input-group-lg">
            <span class="input-group-text">Levantarse, caminar y sentarse (segundos)
            <img class="ml-1" src="@/assets/img/info-removebg-preview.png" data-toggle="tooltip" data-placement="top" title="Levantarse, caminar y sentarse. Propósito: evaluar el equilibrio dinámico y la destreza, que son factores importantes en tareas que requieren maniobras rápidas tales como bajarse del autobús o levantarse para atender algo, etc. Valoración: número de segundos empleados para levantarse desde una posición de sentado, caminar 2,50 m, girar alrededor de una señal y regresar hasta sentarse de nuevo. Zona de riesgo: más de 9 s para varones y mujeres." style="height: 2rem; width: 2rem">
            </span>
            <input type="text"  v-model="upWalkSit"  class="form-control text-center">
          </div>
        </div>
      </div>

      <div class="text-center mb-2">
        <p-button type="success" v-if="showAddButton"
                  round
                  @click.native.prevent="addBand">
          AÑADIR RESIDENTE
        </p-button>
        <p-button type="warning" v-if="showEditButton"
                  round
                  @click.native.prevent="modifyConfirmation">
          MODIFICAR RESIDENTE
        </p-button>
        <p-button type="danger" v-if="showEditButton"
                  round
                  @click.native.prevent="deleteConfirmation">
          BORRAR RESIDENTE
        </p-button>
      </div>
    </div>
  </div>

  <ConfirmDialog></ConfirmDialog>
  <ConfirmDialog group="templating">
    <template #message="slotProps">
      <div class="flex p-4">
        <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
        <p class="pl-2">{{slotProps.message.message}}</p>
      </div>
    </template>
  </ConfirmDialog>
  <ConfirmDialog group="positionDialog"></ConfirmDialog>

</div>
</template>

<script>
import {default as axios} from "axios";
import moment from "moment";
import Calendar from 'primevue/calendar';
import ConfirmDialog from 'primevue/confirmdialog';

export default {
  name: "Register",
  components: {
    Calendar,
    ConfirmDialog
  },
  data() {
    return {
      image:'',
      remoteUrl: '',
      calendarDate:'',
      id:'',
      refresh_token:'',
      name: '',
      showEditButton: false,
      showAddButton: false,
      urlForSteps: '',
      firstName : '',
      lastName : '',
      height : '',
      weight : '',
      age: '',
      gender:'female',
      estimetedSteps:'',
      notes:'',
      needHelp:'no',
      sitUp:0,
      elbowFlexion:0,
      walks:0,
      march:0,
      trunkFlexion:0,
      shouldersFlexion:0,
      upWalkSit:0.0,
      base64encodedImage:'iVBORw0KGgoAAAANSUhEUgAAA1wAAAOuCAYAAAATvxbWAABomklEQVR42uzdZ7TW1bUv4MCmN5EiTQVEFMQKGBUrQfQoRlEDsUWDBRvGEkxEUKNRo9HYYkGSYMMYBXvBgpgIFkRAFBQRpFepm3LA+2HerP/F3OScmGDc5S3Ph2eMk5xhyebda87fu9aa6zv//d//HQAAAJS97/ghAAAACFwAAAACFwAAAAIXAACAwAUAACBwAQAAIHABAAAIXAAAAAIXAAAAAhcAAIDABQAAIHABAAAgcAEAAAhcAAAAAhcAAAACFwAAgMAFAAAgcAEAACBwAQAACFwAAAACFwAAAAIXAACAwAUAACBwAQAAIHABAAAIXAAAAAIXAAAAAhcAAIDABQAAIHABAAAgcAEAAAhcAAAAAhcAAAACFwAAgMAFAAAgcAEAACBwAQAACFwAAAACFwAAAAIXAGVs48aNsXbt2li5cmUsXbo0Fi1aFPPmzYvZs2fHp59+GtOnT4/JkyfHSy+9FH/84x9j6NCh8etf/zquueaauOSSS+LMM8+MPn36xFFHHRUHH3xw7LnnntGpU6fYeeedY4cddsg0b948GjZsGNtss03Uq1cvqlatGt/5znf+pn79+tn/7ystWrT421/bunXr6NixY+y7777RvXv36NWrV5x88snRv3//7J9/1VVXxc033xy//e1v47HHHovXXnstPvjgg5gxY0b27z9r1qyYO3duLFy4MJYsWRJffPFFrFmzJvvf7c8fAIELgDKxYcOGLFSlMPXRRx/FO++8k4WTJ598Mu65554sQJ1//vnRt2/f6NGjR+y9995Z4KlTp84/hKN8UKVKlezfu1WrVrH77rvHYYcdFscff3ycddZZ8fOf/zzuvPPOGDVqVLzyyisxbty4LFCmcJZC2erVq2Pz5s0+MwAIXAB8vbRb9dXO1AMPPBC/+c1v4oorroh+/frFEUccEXvssUdst912Ua1atbwLVGVl2223jV133TUOOuigOOGEE+K8886Lq6++Ou6///4YOXJkvPnmm1kQSyHMjhgAAhdAkVq/fn22a/Xss89muzcDBw6MU089NTuCl47jNW7cuKiD1TdVu3bt7ChjOsZ4zDHHZMcmBw8eHL///e+zXcF03DL9zH32AAQuAApQaWlpfPLJJ/H4449nu1ZHH310dO3aNdq1a5eF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gsYJ4JtL915PPfXU7DkNtQUQuIC/eeedd6Jr167ubQF8S3Xr1o0BAwbEokWL1BdA4AL+Oz7++OPs7oGdLYCyC11DhgzJntdQZwCBC4rY559/HkcccYQGCaCMpTcMb7vttli1apV6AwKXHwIUo4ULF8a5556rMQIoJy1btoyHHnrIw8ggcPkhQLFZvnx5XH311VGvXj1NEUA52mmnnWLMmDFqDwhcQLEoLS2Ne+65J/vmVTMEUP66desWEydOVINA4AIKXTrW8sILL8Ruu+3mrS2AClKtWrU48cQTY968eWoRCFxAodqwYUO8+eabsd9++wlbABWsVq1acf7558eSJUvUJBC4gEI0bdq06NWrl8YHoJI0atQobrrpplixYoW6BAIXUEjSWOL+/ft7awugkrVp0yYeeeSRWLt2rfoEAhdQKO68886oWbOmZgcgB3Tu3DnGjRsXGzduVKNA4ALy3dNPPx1t27bV5ADkiHSPtnv37tkTHeoUCFxAHpsyZUoccsghjhIC5JiSkpK45JJL4ssvv1SvQOAC8k06pvL555/HySefnI0j1twA5J5tt902exdx3bp1ahcIXEA+WbZsWQwePDjq1q2rqQHIYbvssku8+OKL2dMd6hcIXEAeSJOvHnroodh+++01MwB5cLTwqKOOig8++EANA4ELyAfvv/9+dO3aVSMDkCfq1KkTF110UcybN08dA4ELyGXpSMqJJ55oSAZAnmnatGkMHTo01qxZo56BwAXkqttvvz1q1KiheQHIQzvttFNMmjRJPQOBC8jFqYSjR4+O5s2ba1oA8li3bt2yu7hqGwhcQI7YtGlTfPzxx3HwwQc7SghQAK677rooLS1V40DgAnLBkiVL4rLLLot69eppVAAKQIsWLeLZZ5/NvlBT50DgAipReixzxIgR0aZNG00KQAGNiu/Ro0dMnTpVrQOBC6jMo4SpGB922GGOEgIUmPRw/SWXXJKdYlDzQOACKsGyZcvi0ksvNZUQoEC1bNkyHnnkkWwwkroHAhdQwR577LGoWbOmpgSggB100EExYcIEoQsELqAizZ8/P3beeWfNCECBq1KlSlx88cXZqQb1DwQuoAKsWbMmBgwYoBEBKBLbbrttjBo1Sg0EgQuoCE888YQHjgGKTOfOnWPBggXqIAhcQHmaNm1aHH744dnIYA0IQHEdLbz88su9zQUCF1BeSktLY/DgwR44BihS22+/fYwePVpNBIELKGsbNmyIkSNHxk477aTpAChS6c3F9CDyvHnz1EYQuICyNHv27DjppJM0HAAGaMQNN9wQq1evVh9B4ALKwtq1a+P++++PbbbZRrMBQHTp0iX+/Oc/q5EgcAFlYfr06bHPPvtoMgDIpEfv09tcCxcuVCdB4AK+rUsvvdRUQgD+QcuWLeOZZ57J7viqlSBwAf+hDz74wFRCAP7pmPijjjoq5s+fr16CwAX8p3e30ptbGgsAvs6tt96qZoLABXxTGzduzAZlNGzYUEMBwNdq3ry5XS4QuIBvasaMGdG9e/fszRUNBQD/ysCBA93lAoEL2FqlpaXxq1/9KntrRSMBwL/Tpk2bGDdunBoKAhewNd5666044IADsgvRGgkA/p0aNWrEGWecEatWrVJHQeAC/pUVK1bEVVddlRVPTQQAW6tt27YxcuRItRQELuBfDcp49dVXs6MhmgcAvumY+N69e8esWbPUVBC4gH9m2bJlccEFF2gcAPiPNGnSJO67777sLrC6CgIX8D+MHTs2mjVrpmkA4D+WHkNOk243bdqktoLABXzlyy+/jB/+8IeaBQC+lfr168fw4cPtcoHABfy9t99+O+rVq6dZAOBbO/TQQ2PRokXqKwhcQJKOfZxwwgmaBADKRPXq1eOhhx5SY0HgAlLYGjVqVDRt2lSTAECZjol3rBAELih6K1eujD59+kS1atU0CACUqTSxcPPmzeotCFxQvLtbTz31VPYtpMYAgLLWtWvXmDdvnpoLAhcUpyVLlkT//v2jRo0aGgMAylyDBg3itttuyybhqrsgcEHRefHFF2PXXXfVFABQLqpWrRo9e/aMuXPnqrsgcEFxWbp0aVx22WVRUlKiKQCg3DRv3jyGDRum9oLABcVj48aNMWbMmGjTpo1mAIBy17t375g1a5YaDAIXFIcVK1bEoEGDNAEAVIiWLVvGiBEjYsOGDeowCFxQ+KZPnx7t27fXBABQIapUqRL9+vVzlwsELigOt99+e1b8NAEAVJRWrVrFyy+/nB1rV4tB4IKClY5zdOjQQfEHoMJ3uS655JJYvny5egwCFxSuUaNGmUwIQKXtcn322WfqMQhcUJjWr18f3bt3V/QBqDS//OUv1WQQuKAwPf3007Hddtsp+ABUml122SVWrlypLoPABYVlzZo12YSoGjVqKPgAVOpdrieffFJtBoELCsvbb78de+21l2IPQKU75phjorS0VH0GgQsKx69+9ato0KCBQg9ATgzPeOONN9RnELigMMyYMSOOPfZYb28BkBNq1qwZF154YXz55ZfqNAhckP/vbo0YMSKaN2+uyAOQM7p06RKTJ09Wq0Hggvy2ePHiuOiiixR3AHJKkyZN4q677oqNGzeq1yBwQX7atGlTvPPOO9GxY0fFHYCcUrVq1Tj11FNj4cKFajYIXJCf1q5dG/fee29Ur15dcQcg5+y2227x8ssvq9kgcEF+St8aptG7ijoAuTo846abbsq+IFS3QeCCvDNlypSoW7euog5Azjr66KPj448/VrdB4IL8c8UVVyjmAOS0+vXrxwsvvGB4BghckF/WrFkTu+66q2IOQM675JJL4osvvlC/QeCC/PHGG29kE6AUcgByXZqm+/nnn6vfIHBB/ujfv39UqVJFIQcg51WrVi2ef/559RsELsgP8+bNy0btKuIA5Iuzzz5bDQeBC/LDiBEjokmTJgo4AHkj1a3169er4yBwQW5LxeqMM87w2DEAeSXdO37yySfVchC4ILdNmzYt9ttvP8UbgLyS7h2fdtppajkIXJDbHnjggWjVqpXiDUDe2WWXXUwrBIELcvvtrUsvvdRxQgDyUuPGjePhhx9W00Hggtw0derU6Nmzp6INQF6qUaNG9qzJ5s2b1XUQuCD3PPHEE44TApDXDj744Jg1a5a6DgIX5N5xwuuvv95jxwDktTZt2sTjjz+utoPABbll5syZceKJJyrWAOS12rVrx5AhQ7zJBQIX5I5NmzbF22+/He3atVOsAch76QtE0wpB4IKceux4xIgRphMCUBD23HPPeO2119R4ELggNyxfvjwuvPBCRRqAglC3bt0YNmyYGg8CF+SGdOxi9913V6QBKBgXXXRRLF68WJ0HgQsq3/jx46Nq1aoKNAAFNR7+gw8+UOdB4ILKd+ONNyrOABSUpk2bZve4Nm7cqNaDwAWV66ijjlKcASgo6V3J++67L0pLS9V6ELig8qRC1KRJE8UZgILTr1+/WLp0qXoPAhdUnnfeeSdKSkoUZgAKzm677RZz5sxR70Hggspz0003GZgBQEFKXyhOmDBBvQeBCypHukic7m+lc+4KMwCF6I477lDzQeCCyrFw4cLYeeedFWQAClbfvn3V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CzyEnHa5ateurTkAoEyPE77//vtqLQhcwEcffZRdatYgAFBW+vTpo8aCwAV85aqrrtIgAFAmmjZt6u4WCFzA35s9e3a0aNFCowDAt3bOOefE0qVL1VcQuIC/N3jwYI0CAN9KmzZt4qWXXor169errSBwAX/vww8/jF133VXDAMB/pEqVKjFgwIBYvHixugoCF/A/pdG9v/3tb7PJUhoHAL6p9MzIK6+8oqaCwAX8q4mFRx55ZPYtpeYBgK1Vp06d7JmR1atXq6cgcAFfp7S0NIYNG5ZNmNJAALC1Rwm7du0a7777rloKAhfw73z22Wfxgx/8IEpKSjQSAPxb9erVi2uvvdagDBC4gK2xcePGGDFiROywww4aCQD+rX322Sfmzp2rhoLABWytVatWRZ8+faJatWqaCQD+peHDh6udIHAB39S4ceOy91Q0EwB8ncMOOyy+/PJLdRMELuA/MWTIEBMLAfinmjRpEq+++qp6CQIX8J9atGhRdOrUSWMBwD9IR84vvfTSWL58uXoJAhfwbTz44INRt25dDQYAf9O5c+d466231EkQuIBva+HChXHSSSdpMADI1K9fP26++WaPHIPABZSFDRs2xEsvvRStW7fWaAAQRx55ZEyfPl2NBIELKMsx8elRy1q1amk2AIrYTjvtFE888UT2ZqP6CAIXUIbef//96NmzZ5SUlGg6AIpQ+tJtwIABUVpaqi6CwAWUtfRt5sMPPxzbb7+9xgOgCO29994xbdo0NREELqC8LF26NM4555yoWbOm5gOgiKTTDcOHD/fIMQhcQHn76KOPvM0FUGSOP/74WLlypToIAhdQEUcLH3vsMQ0IQJFIR8knTpyoBoLABVTkqPj0NlfVqlU1IwAFLD18f//998fatWvVPxC4gIo+WrjbbrtpSAAKVPXq1eOMM86I2bNnq3sgcAEVbc2aNXHvvfdGkyZNNCYABWivvfaKMWPGqHkgcAGVZe7cudG/f/+oUaOG5gSggDRt2jRuueWWWL16tXoHAhdQmQM03n777TjwwAM1KAAFdJSwb9++sWjRIrUOBC6gsq1fvz6GDh0aLVq00KgAFIC2bdvGlClTYtOmTeocCFxArrj88sujdu3amhWAPFarVq148skn1TUQuIBcM2/evOjevbuGBSBPVatWLc4666z48ssv1TUQuIBcNHbs2Nhuu+00LgB56LDDDouPP/5YPQOBC8hV6bz/DTfckB1J0bwA5I/27dvH008/HevWrVPPQOACcv1o4Y9//OOoUqWKJgYgD2yzzTZx4403xooVK9QxELgAo+IBKCslJSXxwx/+MHtXUQ0DgQvIo6OFzz//fOy66652ugByVNWqVePggw+ODz74QO0CgQvIN+kewG9+85to2rSpxgYgR9/bevbZZ9UsELiAfLVo0aI4++yzo2bNmpobgByS1uXbb7/d48YgcAH5bvr06XHQQQdpcAByRDrq3a9fP0MyQOACCsHmzZtj/Pjx3ucCyBHf+9733NsCgQsoJBs2bIgRI0ZEnTp1NDsAlahDhw4xZsyYbF1Wn0DgAgrIqlWr4uabb4569eppegAq4RjhjjvumH35JWyBwAUUqM8//zzOO++8qFu3rgYIoAI1btw4brjhhli9erV6BAIXUMjvc02dOjW+//3vR40aNTRBABWgVq1a2Zdd8+fPV4tA4AIK3caNG2Ps2LHRuXPn7NFNzRBA+erVq1d88sknahAIXECxSI8iP/PMM9GiRQvNEEA56tSpU0ybNk3tAYELKMbQ9eCDD0a1atU0RQDlYPvtt4/XX39dzQGByw8Binlc/I033mhyIUAZTyRMYWvkyJHZl1vqDQhcfhBQxJYsWRKXXnppNGjQQKMEUAbSce0777wzVq5cqc4AAheYXLgpZs2aFf369fMwMsC31KhRo7jqqqti0aJFagwgcAH/3wcffBDHHXeccfEA/6HatWvHxRdfHHPmzFFXAIEL+N/j4idMmBAHHHCAcfEA/4FTTjkl5s2bp6YAAhfw9UM03nvvvejQoYPmCeAbDMk45JBDYunSpWoJIHAB/97UqVOjXbt2WROhmQL4etWrV4/DDz88Zs+erX4AAhew9ccLR48eHbvttpvQBfA10p3XHj16ZCcD1A5A4AK+kbVr18af/vSnLHRprAD+UXo0Ph0jfOONN7Lj2OoGIHAB39iKFSviD3/4Q+y8884aLIAt0mChrl27xquvvuphY0DgAr596LrvvvuiVatWGi2Av9pll13i9ddfF7YAgQsoG2vWrInf//730bhxY80WUNTTCFu2bBnvvPOOY4SAwAWUvXSnq1mzZhovoCiPEXbq1CnGjx+fDRZSEwCBCyhz6RvdBx54INq2basBA4pqQEaXLl3ihRdecIwQELiA8rVq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cAHkhzRSfsaMGdmggTRkI42Vr1q1qkafSpeODaYjsMOGDYsJEybEypUr/c4CCFwA+WnTpk3xxRdfxNSpU7MG99BDD812FjT+VPRDxR06dIhf/OIXMW7cuJgzZ46x7gACF0Dh3fNKO1+TJk2Kq666Kjp27Jg9IlujRg3HDinzARh169aNHXfcMU4//fR49dVXs4CVPn/uZwEIXABF45VXXokLL7wwGy/fokWLqFatmsDAf7yL1ahRo+jUqVN2f/Duu+/O3s0SsAAELoCilhriNBnugQceyKYcduvWLRu24c4XWxOy0i5ply5d4uSTT45bb701Jk6c6LgggMAFwD+TGuX33nsvhg8fHpdffnkceeSR2c6X8MXfq1OnTuy3335x7rnnxj333BN/+ctfsruCdrMABC4AtlKaHvfhhx/G6NGjs52L73//+9G8eXOBo0ilt93SGPeBAwfGqFGjsgmDixcvFrIABC4Avo006XD16tXZfZw0cONPf/pTnHfeednUOXe+Cn8nq2fPnnHTTTfFn//85/j0009j2bJlQhaAwAVAedmwYUM2bS6FsOnTp8edd94Zxx57bOy0007RuHHjbDqdIJZf0p9X2sFKb2Ttueeecf7558eTTz6Zhav0mHaacClkAQhcAFTyLtj48ePjjjvuiNNOOy3233//aN++fWy33XbZ219Gz+dWwErhKv35pLtY6c8r3cVKAy9SmPaZBhC4AMhxS5YsiTFjxsS9996b3fs55ZRTokePHrHbbrtl48MN4qg46a21NPxk7733jqOPPjrbwUo7k+nPJ/05+bwCCFwA5PkOWBrCMW3atHjppZdi2LBh2ePLP/7xj7M7QimE1a9fXzgqI7Vr187u2KUpk+m+3Y033hgPP/xwjB07NmbNmpUdEfS5BBC4AChg6eja/PnzY+rUqdlY8aeffjruv//++PnPfx59+vTJjrq1bNnSTthWHA9s27ZtHHHEEdkj1mnnKk0RTEMu0pTJtIMlYAEIXACQvQO2fPnymDdvXjYRLwWGNH78sccei+uvvz769esXhx56aDagIx2TK7ZHhtNQkq/uXF177bXZzyW9m/bRRx/F7Nmzs3C1du1aAy4AELgA2HppMmLapUmBLAWKNDkvHVGcOXNmvP766/Hggw/GddddF+ecc0706tUrunbtmu36pB2yZs2aZQMitt1229hmm22yo4tpkmI6dlezZs1sh6ikpKTchnqkHbr0969evXr2z0v/3DRuPf17NGzYMAtRTZs2zd44a9WqVeyxxx5x1FFH/e0o4COPPJLtAKbdwPQzSP/70+5g+r/Tz8XnAwCBC4AKl3Z5VqxYETNmzIi33nornnnmmXjooYfit7/9bRZkrrjiiuwIXtot6t27d3bf6bDDDouDDz44k6Yspt2kFN7+XufOnbPhE19J/zn99/vuu2/21yQHHnhg9vfo3r17Fp7SEcl0X23AgAHZPzft1g0dOjRGjhyZBcYpU6b8LVD5swNA4AKgoI81ph2kpUuXxqJFi7Kjen8vHXVMR/i+kv5z+u/nzJmTHelLf13afUt/jy+//NLPFACBCwAAQOACAABA4AIAABC4AAAABC4AAAAELgAAAIELAABA4AIAAEDgAgAAELgAAAAELgAAAAQuAAAAgQsAAEDgAgAAQOACAAAQuAAAAAQuAAAABC4AAACBCwAAQOACAABA4AIAABC4AAAABC4AAAAELgAAAIELAABA4AIAAEDgAgAAELgAAAAELgAAAAQuAAAAgQsAAEDgAgAAQOACAAAQuAAAAAQuAAAABC4AAACBCwAAQOACAABA4AIAABC4AAAABC4AAAAELgAAAIELAABA4PKDAAAAELgAAAAELgAAAIHLDwEAAEDgAgAAELgAAAAQuAAAAAQuAAAAgQsAAACBCwAAQOACAAAQuAAAABC4AAAABC4AAACBCwAAAIELAABA4AIAABC4AAAAELgAAAAELgAAAIELKDgbN278Bxs2bIh169Z9rdLS0li9evU3smLFim9k2bJlW2XlypX+DCGP/M/1Ja0na9as2eq1ZNWqVd9oLVm+fPlWryf/TPrrv+7vndafr/691q5dm/1vWb9+fbaO+rMGgQvI8YYkFfBU7BcuXBhz586NWbNmxaeffhrTp0+PqVOnxqRJk+K9996Lt99+O958880YO3ZsvPbaazF69Oh44YUX4umnn45Ro0bFyJEj/+bxxx+PRx999B/88Y9/jAceeOAf/OEPf4i77747fvvb3/5Td955Z9x0001b7cYbb4yrrrpqqw0ePDguu+yyuPTSS/+t2267Lft5+dxAfhg/fnwMHTr0b+vJXXfdFbfccstWryfXX3/9N1pLBg4cuFVryddJf/3X/f2vueaabH1L/16/+c1vsv8t999/f7aOPvLII9kam9bdtP4+88wz8dxzz8WLL74YL7/8crz++usxbty4mDBhQkyZMiVb2z/77LOYP39+LF26NKsBaW3btGmTzw0IXMDWSN/kLlmyJAtNKSz95S9/yQpvKsbDhw/PAk5qOr5qJlKRv/DCC+Oss86K0047LX74wx/G8ccfH7169YojjjgiDj300DjggAOia9euseeee0aHDh2iXbt2sf3220ezZs2iYcOGUbdu3ahdu/bf1KhRI77zne8UlG233TYLnT5jkPsWLVoUffv2jWrVqhXcWvTPVKlSJWrWrJmtv2mtatKkSbRo0SJ23HHHaN++fbZ2p3X8e9/7XhxzzDHRp0+fOOOMM+L888//W9BLNeHWW2+NYcOGZfXilVdeyULaJ598EosXLxbKQOCC4tuZSjtSqRg++eSTWYhK34AOGDAgfvSjH0Xv3r2zsHTQQQdFly5domPHjtGmTZssIG2zzTZRq1atqFq1alE0ImWlpKQkfvzjH2fHeHwGIXdt3rw52+lJa561a+ulmpACWwpr6We3++67ZyHt8MMPz2rKqaeeGhdccEFWa9KO4RNPPJHtIn7++eeONoLABfkvHflLR0LSEbtzzjknevTokQWptNuUvsFMBbJevXpRvXr17JtOzUP5SDt7Y8aM8ZmEHN/d6t+/f9HsblWkVGNSrUk1Z4cddohdd9019tlnn+zLvZNPPjmuvvrqGDFiRHYMPd2B83kEgQtyaphEugSdCtQXX3yRnbNP95vSUb/0DWM6GpKO7tWpU0eoqkTpqOTZZ5+d/Vn53EJurqXp/pLdrYqXAm46PVG/fv3sWGPz5s1j3333zepYqmeTJ0/+2wCiNPjDnVgQuKDcpXA1Z86c+PDDD7MhFL/61a/iuOOOy4qU4p270je6qaHzGYbc3N1K95KsVbl5z6xx48Zx2GGHxc9+9rNsuMcHH3yQDfBIQcyxRBC44FtLd3/SBMA0xOJPf/pTdkE5DadIx9TSrpWCnD9Hai666KKsQfC5htza3UoT+dJAH2tVftwZS/eK0xH5n/70p9m0xfTnlwJY2gHzmQaBC7ZKOnr20UcfZSN7f/GLX2RTs/bYY49sqp+Cm7/S3bk0wctnHHJHGm/+k5/8xBqVp9KUxbS2pgmKacx+GnmfhnLY/QKBC/6X9EhlOiJ48803x+mnn54dn0iXi+1iFdZdhcsvvzx7w8ZnHnJDOp6ddkysUYWxxn51B+zEE0+MQYMGxfPPP58dGfVZB4GLIj7KkqYyXXnlldm0pnRMMA25SKPEFc/ClC7lT5w40ecfckQ6lmZtKsy7X+lUSFpz0xCpdEcvjaRfvny5d8EQuKBQpclKa9asyXY33nrrrezyb3pUMk1lSkciTBAsniYgNXjpGJPfC6hc6S0ou1vFse5+NZq+devW2ePNzz77bFaP01rsnUQELshzaZTtzJkzs7s7acztzjvvLFwVuRSyp02b5vcDKvlLsIEDBzq2XcQhrFWrVln4+uMf/xiTJk2KhQsXuveFwAX5VMinT5+efYN23XXXZdOU0ltYihxfSeHb7wpUnqlTp0anTp2sR2Tha6eddsreS0zTgNOx73Sv2u8JAhfkmHQmPF3MHT16dBayjjnmmGjZsmU2wlZB439Kj1Kny/p+d6ByJsGmiXbpsV3rEX8vfSYOOeSQuPTSS7OR82lisDtfCFxQydLZ77Sbdfvtt8cPfvCD2G233aJGjRoKF/92mtYFF1zg+ApUgjQ2PE2yc7ybf7VGpyOHaWLwZZddFi+99FJ2RcDvDwIXVKD/83/+T7z55ptx3nnnZW9kNWrUyG4W30j79u1j7Nixfp+gAqUhCUOGDInatWtbh9gqtWrVyqYd9uzZM+688/+2d5/RXlXX3oAvIiKdiIKIgpSABcUuVqLYRS9q0KjYULFEsGBQIlYUS1SMDaNEo2KJRhTFBETFDvYrSlXaoR6OIk1eMHeM+b5r33vfcZMYQzkbzjn7+fCMfIkZw+y51//89lprzt/GrFmz7HohcEFeLdzTFPu00D722GNx0EEHRYMGDVy4Zq2l2jnzzDNj0aJF3jFYT+v4a6+9lnWItQaxptJH1RTUmzdvHj179oz3338/2/VK97a9XwhcsI7S3aw333wza+XesmVLx1AoN6me0iVtRwshf6WlpVlnQms45XXs8Kijjsq6HE6ePDkLX9ZyBC5Yw06DqZ176jSYBiams9x+YMjji2n37t1jxowZ3jvIeU1Pu1vpaJi1h/I+crjXXnvFgAEDshpLw5W9cwhc8COWLVuWtQu+5557olu3btlQTF9DyVPqZvnEE09ktecdhPzubqUjvNYc8tzxSqMGLrroonj22WezuV7ePQQu+DspaPXr1y8OOOCAaNSokaDFepsBc/TRR8f06dO9h5CTdFqhfv361hzWy8mFNNcrfbR9+OGHY/78+ZpsIHDBV199lc3Oat++fdStW9cPButduoidul+l+UDeSShfqeFRx44drTWs9x2vdEomtZa/++67s11W7yMCF4WyePHimDhxYlx77bXZl6iaNWv6gWCDSj/MkyZN8n5COd/duvHGG7N7NtYZNtQphlR/7dq1i7vuuis7augIOQIXVVba0i8rK4sPP/ww+vTpE02bNvVjQIVy4okn+goK5bjmv/vuu9nMO+sLFUH16tVjhx12yILX+PHjs4+/3lUELqqM1K41/fBeffXV0aJFCws/FVKdOnWyNvHO+8O6S3dnevTo4QQDFc4mm2wS++yzTxa8Pv74Y+3kEbio3NKdmHHjxkX//v1jt912M6iYCn/Zev/9948JEyZ4f2Ed1/4hQ4bE1ltvbW2hQreUP/jgg7Pg9cUXX3h3EbiofKZNm5bd0UrzMTTDoDLtcl122WXx9ddfe49hLY8SpqPj6eOFbrNUBg0bNozOnTvHoEGDoqSkxCkHBC4qx/HBBx54INvR0gaYyqh58+YxdOhQ7zOshXnz5kXv3r2zY1vWEyrTCYfNNtssDjrooPjjH/+osQYCFxWzE1UKWiNHjsxasNauXduXTSp1V6v0df69995zth/WwPLly7OPFWmn2FpCZQ1eaVTIIYccEm+99VYsWrTI7wACFxVjR+v111+Ps846K+rVq2fBpsqErnPPPTc7XuI9h9WTxn20adPGGkKVkE7pnHfeefH2229nx8wFLwQuNsiXzI8++iiuv/762HbbbS3OVMkf29/97neOlsBqKC0tjVNOOcXaQZXb8UozvAYMGJB1NEx/+3jfEbhYLxeip0+fHvfee2/W3SdNc7coU1WlGULpWIl3H378A9ztt9+eHSe3blCVOxoOHjw4FixY4L1H4CI/S5YsiVGjRmUDYrfYYgv3tCiEdJZ/1qxZ1gD4Ad9//308//zz2ccJvwlUdU2aNMl2cv/85z/b7ULgIp+7WldeeWV2fNA8LYo2JPPCCy90tBB+QGoBn1pqV69e3XpBIaS/gdJdxX79+mUf47SRR+BinaQLoqlDz8svvxw777yzoEVhpXbBt956a9aR09oA/2XmzJlx9tlnO1pOYYPXTjvtFM8880wsXLhQ8ELgYs0tXrw4Pvjgg2yeSoMGDSyuFF76ovn000/H0qVLrREUXuraduONN7q3heD1/4JX6tQ8fvz47G8n6wMCF6u1qzV79uxsePHuu+/umAj8r1bxnTp1infeecdOF4VvkvHII49E06ZNrQ3w390Md9ttt+xvp2nTplknELj4cWnYa48ePbKmGBZR+Mcvmccff3xMmjTJTBYKKw25T00yrAnwtzbffPM4/fTT49VXX80ajVkvELj4hyOEDz/8cHTs2NF5fPgX7YG7d++eNZKxdlA0n332Wey9997WAviRRkvpblc6cpvuwVs3ELjITJ48OS644ILseIi2vrB6oatv377x17/+1RpCYaSObF27dnXUHFZDuv+e3pd0IsL6gcBV8EvPqbtOhw4d7GrBGqpbt27cdtttjo1QiLu9c+bMyRoD1KxZ0/sPa3C3Kx2//cMf/pCdinD/V+Dyf0SBpNal6YtLmiFRv359iyKspbQrPGTIEMdGqPJhq0+fPtlHBu89rLn0t9a5556bdX8201HgogBSS+s33ngjjjvuOMcHoRxst9128cQTTwhdVEmlpaVx7bXXxk9+8hPvO6zjbtd+++0XTz75ZHz77bfWF4GLqmru3LkxePDg2HXXXbMX3wII5dMuPl2QTjO6zGChqrV/v/nmm6Nx48bedSgn22yzTVx33XXZ4HDrjMBFFZOOEF500UUaY0BOoWvHHXeMESNGZH+kWnOo7L7//vu47777hC3IQb169eKkk07K5jquWrXKmiNwUdmlC5rphT7wwAOjdu3aFjrIMXSly9Hjxo2z9lDpw1YabLzVVlt5tyHH9vG77757dsQwXfew9ghcVNLGGOmM8GOPPRaNGjWyqwXrSatWrWLs2LF2uqi093zvv//+7DSE9xny/1CX2sdfeeWV8dVXX1mDBC4qW1epdDY4XXSuVauWRQ020PFCF6OpTMrKymLQoEHRrFkz7zKsZ4cffnh8/PHH2d9w1iOBiwoutRtNR5q6d+8ederUsYjBBgpdO++8czz11FPZvDtrExXdwoUL49Zbb3WMEDagPfbYI1544QVdbwUuKrL0NX3YsGHxs5/9zHBKqACha4cddojf//732cBLaxQVVequef3118eWW27p3YUKcBf4zjvvjJKSEuuTwEVFPEZ4++23R7t27bR8hwqkZcuW2Z0Ywy6piJYsWRK//vWvY7PNNvO+QgUJXU2aNIlevXrF1KlTszv51iqBiwoSttKFS4MpoWLafPPN45577om//vWv1iwqjAULFsQvf/nL7NK+9xQqlnQt5JhjjsnG+rjXJXCxgVu+T5s2LU4++WRHCKGCS2MZLrnkkpg/f3727lrD2JADjT/77LM4/vjj/XZABZZOLKUjhm+//bZTEgIXG6p177vvvhtHHXVU1KhRw8IElcCmm26aDbv85JNPtI1ngx0hfO211+LQQw91/BwqiXS/cujQoVFaWmodE7hYn80xnnvuuTjggAOievXqFiOoZMMujzzyyHj11VcNu2S972ylzpn77LOP2YxQyaTZeAMHDszG/rjXJXCxHu5rpQv4ac6PH0yonNKHko4dO2Z//FrXWB9Sp8zf/va30bp1a+8gVFJbbLFFXHzxxfHll19a1wQu8pK+aNx1112GUkIVkf74ve222+x0kavU6ax3797ZH2veO6jc6tevn93dT++1ZhoCFzk0yLj55pujcePGFhyoQlJ30R49esSMGTOsdZSrVatWZfcFjz322Kxpi/cNqobU7KZTp04xffp0a53ARXkdIZw7d2706dMn+6phoYGqe8Tw5ZdfzobQWvtYV2VlZfH4449nHc4cP4eqOa9r++23j7Fjx2rCJHCxrrtaaf5Cz549s3kMFhio2lq1ahX33ntvzJ4921ER1vro+YQJE6Jfv34+0kEBQlf79u3jxRdfjEWLFlkDBS7WZmfrP/7jP6J79+5ZK2kLCxRDw4YN44ILLohx48bpRMUaSX9w/eUvf4kuXbrY1YICha7USC3taKedbWuhwMUamDhxYvz7v/+7GVtQQGk+0s9+9rPsB/Trr7+2JvIvd7VSq+hbb701tttuO/O1oIChq127dvHAAw/4zRC4WJOOUumSsxlbUOwf0G222SZ69eqVHRFLDRCsj/zQbK233347G6i9+eab29mCAmvevHl2LH3ZsmXWR4GLf7WzlY6D2NkCklq1asW+++4bL730kvbx/MPO1t133x1t2rTJBmp7X4BGjRplI4SskQIX/+Qr5fvvvx+dO3e2swX8w25XCl5nnHFGNvBS8Cr2/d50ZOiNN96IAw44wPFB4B+kRmsDBw7MBp5bNwUu/lva+n3zzTfj0EMP9eMJ/Kh0R+ehhx6KKVOmaAVcMEuWLMnmavXt2zc7Puh9AH5sp+uGG26IBQsWaMAkcJFav6ew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rh+Xkvk999yTtbr08gAAwOpp3bp1vPjii7FixQq5QuD6Yak43nvvvazFpZcGAABWXzod1rVr15g8ebJsIXD9sLlz50bPnj2jRo0aXhoAAFhDP/nJT2LgwIHx9ddfyxcC1z8OOH7ssceiQYMGXhYAAFhL7dq1izFjxjhaKHD9rYULF0abNm28JAAAsA7SQOQTTzwxZs2aJWwJXP9l6dKl0atXLy8IAACUU+i677777HIJXP8nVq1aFaNGjYrGjRt7OQAAoJw0b948vvzyS4Gr6IFrxowZccwxx5i5BQAA5ey8884zm6vIgWv58uVxxx13RKNGjbwQAABQztIpsueee07gKuq/+Ntvvx0dO3aMatWqeSEAAKCcVa9ePQ477LCYNm2awFU08+fPj0svvdRRQgAAyFH9+vXjpptuKnQDjX8r4syt4cOHx5ZbbuklAACAnO2yyy4xevTowoauwgWuNBPguOOOU/wAALAepFNlF198ccybN0/gqupSqn700UejTp06ih8AANaTbbfdNjtllhrXCVxV2IIFC2LnnXdW9AAAsB6lRnXdunWLkpISgasqu+WWW7LJ14oeAADWr3TK7IknnijcXa7CBK7PP/88WrZsqdgBAGAD2X777WPx4sUCV1WzbNmy6NGjR2yyySYKHQAANqB06qxIu1xVPnCtXLkyRowYEa1bt1bgAACwgbVt2zamTJkicFWlIcfnnntu1KxZU4EDAMAGVqtWrbjyyisL07Hw36r67tYLL7xgdwsAACqI1LEwDUN+7733BK6qMOS4Z8+e2bA1xQ0AABVnl6tPnz6FaKBRZQNXuoj30ksvRePGjRU1AABUMDvttFOMGjWqyjfQqLKBa/bs2fHzn/9cMQMAQAWU5uP27t0767kgcFXC3a10dysNV1PMAABQMf30pz+NV155Jb777juBq7LN3ercubMiBgCACt5A4/LLL4+FCxcKXJXJ6NGjtYEHAIBKYJttton3339f4KosVq1aFV27dlW8AABQSXa5Lrvssip7rLDKBa6XX35ZZ0IAAKhE6tWrFzNmzBC4KrrUx79bt27mbgEAQCVz8cUXV8ldrioTuFauXBnDhw+PVq1aKVgAAKhkWrRoERMmTBC4KqrU2eT888/XLAMAACqh2rVrR//+/QWuimrkyJGx4447KlYAAKikzTP22WefmDhxosBV0XzzzTdx9dVXR40aNRQrAABUUptttlkMGjQovv/+e4GrIkl9+/fcc09FCgAAlXyX65hjjompU6cKXBXFkiVL4r777ovq1asrUgAAqOTSiKchQ4ZUmY6FlT5wpX79nTp1UpwAAFBFnHbaaVVmLlelDlwrVqyIYcOGxaabbqowAQCgithmm21i1KhRAteGlrYZu3TpoigBAKAK2WijjeKqq66KsrIygWtD+vTTT6NWrVqKEgAAqpjtttsupk+fLnBtyOOEv/zlLxUjAABU0V2uhx56KPu7X+DaQM0yWrZsqRgBAKCK2muvvbKu5ALXBpAGotWvX18hAgBAFd7leueddwSu9W3+/Plx9NFHm70FAABV3FlnnRWrVq0SuNan4cOHR+vWrRUgAABUcenv/qlTpwpc68vy5cvj8ssvj5o1aypAAACo4tI1orvvvlvgWl8++OCD2H///RUfAAAU5B7XkUceGYsWLRK41seg4/vvvz8aNmyo+AAAoCDatGkTL730ksCVt5kzZ8YZZ5yh6AAAoEBq164dV1xxRSxdulTgysvKlSuzlpBt27ZVdAAAUDCHHXZYfPHFFwJXXtLAs3ScsEaNGgoOAAAKpmnTpvHUU09VuhbxlSZwlZSURNeuXRUbAAAUtHlG3759o6ysTODKwyeffBL16tVTbAAAUFCpW3nKBQJXOVuxYkVcc801igwAAArePOO5557LupcLXOVo2bJlsdNOOykyAAAouEsvvTRKS0sFrvL0/vvvR/Xq1RUYAAAUXPv27WPatGkCV3m68sorFRcAAJB1La9MQ5ArfOBavnx57LbbbooLAADInHvuuVmfB4GrHIwePToaN26ssAAAgEzKB3a4yskVV1wRtWrVUlgAAMD/N2bMGIFrXaXuI4ccckhUq1ZNUQEAAP/fZZddJnCtq1GjRkW7du0UFAAA8DdSn4dFixYJXGtr5cqVMXDgwKhfv76CAgAA/kaTJk3irbfeErjW1pw5c+Lkk092nBAAAPgHdevWjRtuuEHgWluvvfZa7LrrrooJAAD4B2lj5ogjjojFixcLXGsq9dR/8MEHo2HDhooJAAD4Qe3bt493331X4FpTCxcujMsvv1wRAQAAP3qP64EHHhC41tTnn38ehx12mCICAAD+qRo1akTv3r1j6dKlAteadCd8/fXXo2nTpooIAAD4UV26dImpU6cKXKsrpdO0LbjRRhspIAAA4F/e4xo5cqTAtbrmzp0bp556quIBAAD+pdq1a8fgwYMFrtU1efLkaNWqleIBAABWS7rHNX/+fIFrdbzyyiuOEwIAAKutc+fOMX78eIFrdVxzzTWKBgAAWG1bb7111nhP4FqNgcedOnVSNAAAwGrbeOON4/HHH4/ly5cLXD9m2bJlUadOHUUDAACskSuvvDLKysoErh/zl7/8RbEAAABrdY9r5syZAtePueKKKxQLAACwxrbYYov44osvBK4fu791wAEHKBYAAGCtjBgxQuD6Z0pKSmLbbbdVKAAAwFrp37+/wPVj97caN26sUAAAgLVyxBFHZCfnBK4fcPvtt0e9evUUCgAAsFY233zz+M///E+B64eceuqpWf98hQIAAKytKVOmCFx/r7S0NA488EAFAgAArJMnn3xS4Pp7H3zwQXTo0EGBAAAA6+Tyyy8XuP7eCy+8EK1bt1YgAADAOkkDkAWuv/PAAw9EkyZNFAgAALBO2rZtG4sWLRK4/rdrr702ateurUAAAIB10qxZsxg/frzA9T+WL18e559/flSrVk2BAAAA6yS1hn/uuecErv9RUlIS3bp1UxwAAMA6S7N9b7vtNoHrf3z++edx2GGHKQ4AAGCd1axZMztBJ3D9t3HjxsV+++2nOAAAgHWWrip16dIlVqxYIXAlr776qhlcAABAuTnwwAOjtLRU4EqGDx8ebdq0URgAAEC52HPPPWPChAkCVzJ06NDYcsstFQYAAFAudthhhxgzZozAlfzud7/LOokoDAAAoDy0bNky/vSnPwlcyaBBg6J69eoKAwAAKBdNmjTJNnYKH7jS0OObb75ZUQAAAOWmfv36cdNNNwlcixcvjmuuuUZRAAAA5WaTTTaJX/3qVwJXWVlZ9O3bV1EAAADlJs3iuvDCCwWuefPmxUUXXaQoAACAcnXmmWfGN998U+zAVVJSEuecc46CAAAAytWJJ54Ys2fPLnbgmj59enTv3l1BAAAA5apLly4xZcqUYgeuqVOnxgknnKAgAACActW5c+f49NNPix24Jk6cGEcffbSCAAAAytU+++wT7733XrED1/jx47PkqSAAAIDy1KFDh3j11VeLHbg+/vjj2HfffRUEAABQrtq1axcjRowoduD68MMPY88991QQAABAuWrZsmUMGzas2IFr3LhxscsuuygIAACg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',
      imageName:'',
    }
  },
  mounted() {
    let self = this;
    if(self.$route.params.calledFrom === 'edit'){
      self.showEditButton = true;
      self.completeFieldsWithExistingInfo();
    }else if (self.$route.params.calledFrom === 'register'){
      self.showAddButton = true;
    }
  },
  methods:{
    handleImage(e){
      let self = this;
      const selectedImage = e.target.files[0];
      const reader = new FileReader();
      let rawImg;
      reader.onloadend = () => {

        rawImg = reader.result;
        const words = rawImg.split(',');
        self.base64encodedImage = words[1]
      }
      self.imageName = selectedImage.name
      reader.readAsDataURL(selectedImage);
    },

    completeFieldsWithExistingInfo(){
      console.log(this.$store.state.userInformation)
      this.id = this.$store.state.userInformation.id;
      this.name = this.$store.state.userInformation.name;
        this.refresh_token =this.$store.state.userInformation.refresh_token;
      this.firstName = this.$store.state.userInformation.firstName;
      this.lastName = this.$store.state.userInformation.lastName;
      this.weight = this.$store.state.userInformation.weight;
      this.height = this.$store.state.userInformation.height;
      this.age = moment(this.$store.state.userInformation.age).format('YYYY-MM-DD');
      this.estimetedSteps = this.$store.state.userInformation.estimatedSteps;
      this.gender = this.$store.state.userInformation.gender;
      this.notes =this.$store.state.userInformation.notes;
      this.sitUp =this.$store.state.userInformation.sitUp;
      this.elbowFlexion =this.$store.state.userInformation.elbowFlexion;
      this.walks =this.$store.state.userInformation.walks;
      this.march =this.$store.state.userInformation.march;
      this.trunkFlexion =this.$store.state.userInformation.trunkFlexion;
      this.shouldersFlexion =this.$store.state.userInformation.shouldersFlexion;
      this.upWalkSit =this.$store.state.userInformation.upWalkSit;
      this.base64encodedImage=this.$store.state.userInformation.base64encodedImage;
      this.imageName=this.$store.state.userInformation.imageName;

    },
    addBand(){
      let self=this;
      axios.post("http://localhost:5999/initial",{
          personName: self.firstName,
          personLastName: self.lastName,
          personHeight: self.height,
          personWeight: self.weight,
          age:self.age,
          gender:self.gender,
          estimetedSteps:self.estimetedSteps,
          notes:self.notes,
          sitUp:self.sitUp,
          elbowFlexion:self.elbowFlexion,
          walks:self.walks,
          march:self.march,
          trunkFlexion:self.trunkFlexion,
          shouldersFlexion:self.shouldersFlexion,
          upWalkSit:self.upWalkSit,
          base64encodedImage:self.base64encodedImage,
          imageName:self.imageName
      }).then(function (response) {
        console.log(response.data)
          self.urlForSteps= response.data
        console.log(self.urlForSteps)
          window.open(self.urlForSteps, "_blank");
        }).catch(error => {
        if (!error.response) {
          this.errorStatus = 'Error: Network Error';
        } else {
          this.errorStatus = error.response.data.message;
        }
      })
    },

    modifyBand(){
      let self=this;
      axios.post("http://localhost:5998/pasos/modifyInfo",{
          id: self.id,
        refresh_token:self.refresh_token,
        name:self.name,
        firstName: self.firstName,
        lastName: self.lastName,
        height: self.height,
        weight: self.weight,
        age:self.age,
        gender:self.gender,
        estimatedSteps:self.estimetedSteps,
        notes:self.notes,
        sitUp:self.sitUp,
        elbowFlexion:self.elbowFlexion,
        walks:self.walks,
        march:self.march,
        trunkFlexion:self.trunkFlexion,
        shouldersFlexion:self.shouldersFlexion,
        upWalkSit:self.upWalkSit,
        base64encodedImage:self.base64encodedImage,
        imageName:self.imageName
      }).then(function (response) {
     console.log(response)

      }).catch(error => {
        if (!error.response) {
          this.errorStatus = 'Error: Network Error';
        } else {
          this.errorStatus = error.response.data.message;
        }
      })
    },

    deleteBand(){
      let self=this;
      console.log('SEND DELETE')
      axios.post("http://localhost:5998/pasos/deleteUser",{
        id: self.id
      }).then(function (response) {
        console.log('myresponse',response)
        if(response.status == 200){
          console.log('llamando a la pestaña de usuarios')
          self.moveToMainPage();
        }


      })
    },

    deleteConfirmation() {
      let self=this;
      self.$confirm.require({
        message: '¿ Seguro que desea borrar este residente ?',
        header: 'Borrar residente',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
         self.deleteBand()
        },
        reject: () => {
          //callback to execute when user rejects the action
        },
        onHide: () => {
          //Callback to execute when dialog is hidden
        }
      });
    },

    modifyConfirmation() {
      let self=this;
      self.$confirm.require({
        message: '¿ Seguro que desea modificar la información personal de este residente ?',
        header: 'Modificar residente',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          self.modifyBand()
        },
        reject: () => {
          //callback to execute when user rejects the action
        },
        onHide: () => {
          //Callback to execute when dialog is hidden
        }
      });
    },


    moveToMainPage(){
      console.log('moviendo a la pestaña de usuarios')
      this.$router.push({name: 'main'});
    }


  },
}
</script>

<style scoped>

</style>
