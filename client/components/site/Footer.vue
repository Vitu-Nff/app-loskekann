<template>
  <footer class="footer">
    <section>
      <div class="footer-row">
        <div class="footer-contatos">
          <div>
            <p>
              <strong style="font-size: 12px; color: rgb(0, 159, 143);">CENTRAL DE ATENDIMENTO SICOOB </strong>
            </p>
            <p>
              <strong style="font-size: 12px; color: rgb(255, 255, 255);">Capitais e regiões metropolitanas: </strong>
              <span style="font-size: 12px; color: rgb(255, 255, 255);">4000 1111 </span>
            </p>
            <p>
              <strong style="font-size: 12px; color: rgb(255, 255, 255);">Demais localidades:</strong>
              <span style="font-size: 12px; color: rgb(255, 255, 255);"> 0800 642 0000</span>
            </p>
            <p>
              <strong style="font-size: 12px; color: rgb(255, 255, 255);">SAC 24 horas</strong>
              <span style="font-size: 12px; color: rgb(255, 255, 255);">: 0800 724 4420</span>
            </p>
            <p>
              <strong style="font-size: 12px; color: rgb(255, 255, 255);">Ouvidoria</strong>
              <span style="font-size: 12px; color: rgb(255, 255, 255);">: 0800 725 0996 - de seg. a sex., das 8h às 20h - ouvidoriasicoob.com.br</span>
            </p>
            <p>
              <strong style="font-size: 12px; color: rgb(255, 255, 255);">Deficientes auditivos ou de fala</strong>
              <span style="font-size: 12px; color: rgb(255, 255, 255);">: 0800 940 0458 - de seg. a sex., das 8h às 20h</span>
            </p>
          </div>
        </div>
        <div class="footer-row-redes">
          <div class="footer-redes">
            <div>
              <div>
                <!-- <a href="https://www.facebook.com/sicoobes" target="_blank"> <img src="../../static/fb.png"></a> -->
              </div>
            </div>
          </div>
          <div class="footer-redes">
            <div>
              <div>
                <!-- <a href="https://www.instagram.com/sicoobes/" target="_blank"> <img src="../../static/inst.png"></a> -->
              </div>
            </div>
          </div>
          <div class="footer-redes">
            <div>
              <div>
                <!-- <a href="https://www.linkedin.com/company/sicoobespiritosanto/" target="_blank"> <img src="../../static/linkedin.png"></a> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="footer-logo">
        <!-- <img src="../../static/logo-sicoob-original-branco.png" width="120px" heigth="30px"> -->
      </div>
    </section>
  </footer>
</template>

<script>

export default {

  name: 'FooterSite',

  data () {
    return {
    }
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
  }
}

</script>

<style>

.footer {
  background-color: rgba(0,54,65,1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
}

.footer > section {
  display: block;
  max-width: 960px;
  width: 100%;
}

.footer-row {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-flow: row nowrap;
  min-height: 176px;
  margin: 0;
  padding: 0;
  border: 0;
  @media (max-width: 670px) {
    flex-flow: column nowrap;
  }
}

.footer-row-redes {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-flow: row nowrap;
  min-height: 176px;
  min-width: 240px;
  margin: auto;
  padding: 0;
  border: 0;
  max-width: 100%;
  @media (max-width: 240px) {
    min-width: unset;
  }
}

.footer-row > div {
  max-width: 960px;
  @media (max-width: 960px) {
    max-width: 100% !important;
  }
}

.footer-contatos {
  flex: 9 0 0;
  margin: auto;
  margin-top: 20px;
  padding: 0;
  border: 0;
}

.footer-contatos > div {
  background-color: transparent;
  justify-content: center;
  padding: 0px 10px;
}

.footer-contatos p {
  margin: 0;
  padding: 0;
  border: 0;
}

.footer-redes {
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.footer-redes > div {
  min-height: 176px;
  background-color: transparent;
  justify-content: center;
  padding: 0px 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
}

.footer-redes > div > div {
  margin: 0;
  padding: 0;
  border: 0;
  margin-top: 30px;
  margin-bottom: 10px;
  align-self: center;
  max-width: 30px;
}

.footer-redes > div > div > a  {
  width: 30px;
  max-width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  border: 0;
}

.footer-redes > div > div > a > img {
  width: 30px;
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  margin: 0;
  padding: 0;
  border: 0;
}

.footer-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem 0px;
}

</style>
