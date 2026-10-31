package com.talentprep.app;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class ResultadosActivity extends AppCompatActivity {

    TextView tvNombreResultado;
    TextView tvCategoriaResultado;
    Button btnVolverInicio;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_resultados);

        tvNombreResultado = findViewById(R.id.tvNombreResultado);
        tvCategoriaResultado = findViewById(R.id.tvCategoriaResultado);
        btnVolverInicio = findViewById(R.id.btnVolverInicio);

        String nombre = getIntent().getStringExtra("nombre");
        String categoria = getIntent().getStringExtra("categoria");

        tvNombreResultado.setText("Participante: " + nombre);
        tvCategoriaResultado.setText("Categoría: " + categoria);

        btnVolverInicio.setOnClickListener(v -> {
            Intent intent = new Intent(
                    ResultadosActivity.this,
                    MainActivity.class
            );

            intent.setFlags(
                    Intent.FLAG_ACTIVITY_CLEAR_TOP |
                            Intent.FLAG_ACTIVITY_SINGLE_TOP
            );

            startActivity(intent);
            finish();
        });
    }
}
