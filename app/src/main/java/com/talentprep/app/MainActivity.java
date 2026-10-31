
package com.talentprep.app;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    EditText etNombre;
    Spinner spCategoria;
    Button btnIniciar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        etNombre = findViewById(R.id.etNombre);
        spCategoria = findViewById(R.id.spCategoria);
        btnIniciar = findViewById(R.id.btnIniciar);

        String[] categorias = {
                "Atención al cliente",
                "Tecnología",
                "Administración",
                "Ventas"
        };

        ArrayAdapter<String> adapter = new ArrayAdapter<>(
                this,
                android.R.layout.simple_spinner_item,
                categorias
        );

        adapter.setDropDownViewResource(
                android.R.layout.simple_spinner_dropdown_item
        );

        spCategoria.setAdapter(adapter);

        btnIniciar.setOnClickListener(v -> {

            String nombre = etNombre.getText().toString().trim();
            String categoria = spCategoria.getSelectedItem().toString();

            if (nombre.isEmpty()) {
                etNombre.setError("Escribe tu nombre");
                etNombre.requestFocus();
                return;
            }

            Intent intent = new Intent(
                    MainActivity.this,
                    EntrevistaActivity.class
            );

            intent.putExtra("nombre", nombre);
            intent.putExtra("categoria", categoria);

            startActivity(intent);
        });
    }
}

