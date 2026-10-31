package com.talentprep.app;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class EntrevistaActivity extends AppCompatActivity {

    TextView tvNumeroPregunta;
    TextView tvPregunta;
    EditText etRespuesta;
    Button btnSiguiente;

    int numero = 0;

    String nombre;
    String categoria;

    String[] preguntas = {
            "¿Cuáles son tus principales fortalezas?",
            "¿Por qué te interesa trabajar en esta empresa?",
            "¿Cómo solucionarías un problema con un cliente?"
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_entrevista);

        tvNumeroPregunta = findViewById(R.id.tvNumeroPregunta);
        tvPregunta = findViewById(R.id.tvPregunta);
        etRespuesta = findViewById(R.id.etRespuesta);
        btnSiguiente = findViewById(R.id.btnSiguiente);

        nombre = getIntent().getStringExtra("nombre");
        categoria = getIntent().getStringExtra("categoria");

        mostrarPregunta();

        btnSiguiente.setOnClickListener(v -> {

            String respuesta = etRespuesta.getText().toString().trim();

            if (respuesta.isEmpty()) {
                etRespuesta.setError("Escribe tu respuesta");
                etRespuesta.requestFocus();
                return;
            }

            numero++;

            if (numero < preguntas.length) {
                mostrarPregunta();
            } else {

                Intent intent = new Intent(
                        EntrevistaActivity.this,
                        ResultadosActivity.class
                );

                intent.putExtra("nombre", nombre);
                intent.putExtra("categoria", categoria);

                startActivity(intent);
                finish();
            }
        });
    }

    private void mostrarPregunta() {

        tvNumeroPregunta.setText(
                "Pregunta " + (numero + 1) + " de " + preguntas.length
        );

        tvPregunta.setText(preguntas[numero]);
        etRespuesta.setText("");
    }
}
