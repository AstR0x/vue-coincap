import {BILLION, MILLION} from '../constants';

export default {
  methods: {
    shortenNumber(value) {
      const floatValue = parseFloat(value);

      if (floatValue > BILLION) {
        return `${(floatValue / BILLION).toFixed(2)}b`;
      }

      if (floatValue > MILLION) {
        return `${(floatValue / MILLION).toFixed(2)}m`;
      }

      return floatValue < 1 ? floatValue.toFixed(8) : floatValue.toFixed(2);
    },
  },
}

