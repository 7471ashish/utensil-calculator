package com.utensilcalc.app

import android.content.Context
import android.content.res.Configuration
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import androidx.appcompat.app.AppCompatActivity
import com.utensilcalc.app.databinding.ActivityMainBinding
import java.text.DecimalFormat
import java.util.Locale

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private var isGrams = true
    private var currentLang = "en"
    private val currencyFormat = DecimalFormat("₹#,##0.00")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupUI()
    }

    private fun setupUI() {
        val watcher = object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                calculatePrice()
            }
            override fun afterTextChanged(s: Editable?) {}
        }

        binding.etRate.addTextChangedListener(watcher)
        binding.etWeight.addTextChangedListener(watcher)

        // Grams / Kg Toggle
        binding.toggleUnit.addOnButtonCheckedListener { _, checkedId, isChecked ->
            if (isChecked) {
                when (checkedId) {
                    R.id.btnGrams -> {
                        if (!isGrams) {
                            isGrams = true
                            binding.tilWeight.suffixText = "g"
                            convertWeightToGrams()
                        }
                    }
                    R.id.btnKg -> {
                        if (isGrams) {
                            isGrams = false
                            binding.tilWeight.suffixText = "kg"
                            convertWeightToKg()
                        }
                    }
                }
                calculatePrice()
            }
        }

        // Clear Button
        binding.btnClear.setOnClickListener {
            binding.etWeight.text?.clear()
            calculatePrice()
            binding.etWeight.requestFocus()
        }

        // Language Toggle (English <-> Hindi)
        binding.btnLanguageToggle.setOnClickListener {
            toggleLanguage()
        }
    }

    private fun toggleLanguage() {
        if (currentLang == "en") {
            currentLang = "hi"
            applyLocale("hi")
            binding.btnLanguageToggle.text = "English"
        } else {
            currentLang = "en"
            applyLocale("en")
            binding.btnLanguageToggle.text = "हिंदी"
        }
    }

    private fun applyLocale(langCode: String) {
        val locale = Locale(langCode)
        Locale.setDefault(locale)
        val config = Configuration()
        config.setLocale(locale)
        val res = createConfigurationContext(config).resources

        binding.tvAppTitle.text = res.getString(R.string.title)
        binding.tvRateLabel.text = res.getString(R.string.rate_label)
        binding.etRate.hint = res.getString(R.string.rate_hint)
        binding.tvWeightLabel.text = res.getString(R.string.weight_label)
        binding.etWeight.hint = res.getString(R.string.weight_hint)
        binding.btnGrams.text = res.getString(R.string.unit_grams)
        binding.btnKg.text = res.getString(R.string.unit_kg)
        binding.btnClear.text = res.getString(R.string.clear)
        binding.tvPriceHeader.text = res.getString(R.string.calculated_price)

        calculatePrice()
    }

    private fun convertWeightToGrams() {
        val current = binding.etWeight.text.toString().toDoubleOrNull() ?: return
        val inGrams = current * 1000.0
        binding.etWeight.setText(if (inGrams % 1.0 == 0.0) inGrams.toLong().toString() else inGrams.toString())
    }

    private fun convertWeightToKg() {
        val current = binding.etWeight.text.toString().toDoubleOrNull() ?: return
        val inKg = current / 1000.0
        binding.etWeight.setText(inKg.toString())
    }

    private fun calculatePrice() {
        val rateText = binding.etRate.text.toString().trim()
        val weightText = binding.etWeight.text.toString().trim()

        val rate = rateText.toDoubleOrNull()
        val weight = weightText.toDoubleOrNull()

        if (rate == null || rate <= 0.0 || weight == null || weight <= 0.0) {
            binding.tvPriceResult.text = "₹0.00"
            binding.tvFormula.text = if (currentLang == "hi") "ऊपर भाव और वजन डालें" else "Enter rate and weight above"
            return
        }

        val weightInKg = if (isGrams) weight / 1000.0 else weight
        val totalPrice = rate * weightInKg

        binding.tvPriceResult.text = currencyFormat.format(totalPrice)

        if (isGrams) {
            binding.tvFormula.text = "₹$rate/kg × $weight g ÷ 1000 = ${currencyFormat.format(totalPrice)}"
        } else {
            binding.tvFormula.text = "₹$rate/kg × $weight kg = ${currencyFormat.format(totalPrice)}"
        }
    }
}
