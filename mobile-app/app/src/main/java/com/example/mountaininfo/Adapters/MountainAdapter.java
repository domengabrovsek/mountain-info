package com.example.mountaininfo.Adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView;
import com.example.mountaininfo.API.APIResults;
import com.example.mountaininfo.R;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class MountainAdapter extends RecyclerView.Adapter<MountainAdapter.ViewHolder> {

    private List<APIResults.Mountain> mountains;
    public OnItemClickListener listener;

    public interface OnItemClickListener{
        void onItemClick(int position);
    }

    public MountainAdapter(List<APIResults.Mountain> mtns){
        mountains = mtns;
    }

    public void setOnItemClickListener(final OnItemClickListener l){
        listener = l;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder{
        ImageView image;
        TextView name, range, altitude;
        ConstraintLayout layout;

        public ViewHolder(@NonNull View itemView, final OnItemClickListener listener) {
            super(itemView);
            image = itemView.findViewById(R.id.mountain);
            name = itemView.findViewById(R.id.mountainName);
            range = itemView.findViewById(R.id.mountainRange);
            altitude = itemView.findViewById(R.id.mountainAltitude);
            layout = itemView.findViewById(R.id.parent);

            layout.setOnClickListener(new View.OnClickListener(){

                @Override
                public void onClick(View view) {
                    if(listener != null){
                        listener.onItemClick(getAdapterPosition());
                    }
                }
            });
        }
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.mountain_item, parent, false);
        ViewHolder evh = new ViewHolder(v, listener);
        return evh;
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        APIResults.Mountain currentMountain = mountains.get(position);
        holder.image.setImageResource(chooseRandomPicture());
        holder.name.setText(currentMountain.getName());
        holder.range.setText(currentMountain.getRange());
        holder.altitude.setText(Integer.toString(currentMountain.getAltitude()));
    }

    public int chooseRandomPicture(){
        List<Integer> images = Arrays.asList(R.drawable.mountain1, R.drawable.mountain2, R.drawable.mountain3, R.drawable.mountain4);
        Random rnd = new Random();
        return images.get(rnd.nextInt(images.size()));
    }

    @Override
    public int getItemCount() {
        return mountains.size();
    }



}
