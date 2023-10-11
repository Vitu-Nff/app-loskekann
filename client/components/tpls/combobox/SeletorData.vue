<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="data"
      :disabled="isDisabled || isLoading"
      :loading="isLoading"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
    >
      <template #activator="{ on, attrs }">
        <ComboboxMindtec
          ref="combobox"
          :value="dataFormatada"
          :multiple="multiple"
          :chips="multiple"
          :small-chips="multiple"
          :label="label"
          :disabled="isDisabled || isLoading"
          :required="required"
          :loading="isLoading"
          :rules="required ? regras : [true]"
          :input-props="{ readonly:true }"
          :items="[]"
          clearable
          filled
          dense
          v-bind="attrs"
          v-on="on"
        />
      </template>
      <v-date-picker
        :value="data"
        :type="type"
        :max="max"
        :min="min"
        :multiple="multiple"
        :allowed-dates="datasValidas"
        locale="pt-br"
        color="#14a89c"
        no-title
        scrollable
        @input="updateValue"
      >
        <v-spacer />
        <v-btn
          text
          color="primary"
          @click="menu = false"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="$refs.menu.save(data)"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import loading from '~/plugins/mixin/loading'
import disable from '~/plugins/mixin/disable'
import ComboboxMindtec from '~/components/tpls/combobox/base/Base.vue'

export default {
  name: 'SeletorData',
  components: {
    ComboboxMindtec
  },
  mixins: [loading, disable],
  props: {
    value: {
      required: true,
      validator: prop => ['string', 'number', 'array', 'object'].includes(typeof prop) || prop === null || prop === undefined
    },
    date: {
      type: [String, Date, Object, Array],
      default: undefined
    },
    label: {
      type: String,
      default: 'Data'
    },
    type: {
      type: String,
      default: 'date'
    },
    max: {
      type: String,
      default: null
    },
    min: {
      type: String,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    allowedDates: {
      type: Array,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default () {
        return this.required
          ? [v => !!v || 'O campo' + this.label + 'é obrigatório.']
          : []
      }
    },
    modal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menu: false,
      data: this.value,
      dataFormatada: this.formatarData(this.value)
    }
  },
  methods: {
    async updateValue (valor) {
      this.data = valor
      this.dataFormatada = this.formatarData(valor)
      await this.$nextTick()
      this.$emit('input', this.dataFormatada)
      this.$emit('update:date', valor)
      await this.$nextTick()
      this.$refs.combobox.setValue(this.dataFormatada)
    },
    mostrarSeletor (estado) {
      if (estado === 'modal') {
        this.dialog = true
      }
    },
    formatarData (data) {
      if (!data) { return null }

      const dataArray = data.split('-')

      if (this.type === 'month') {
        const ano = dataArray[0]
        const mes = dataArray[1]

        return ano + '/' + mes
      } else if (this.type === 'date') {
        const ano = dataArray[0]
        const mes = dataArray[1]
        const dia = dataArray[2]

        return dia + '/' + mes + '/' + ano
      }

      return null
    },
    datasValidas (valor) {
      if (!this.allowedDates) {
        return true
      } else {
        return this.allowedDates.includes(valor)
      }
    }
  }
}
</script>
