"use client";

import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { CustomerDataInfo } from "../../page";
import { ImSpinner10 } from 'react-icons/im';

const schema = z.object({
    name: z.string().min(1, "O nome do chamado é obrigatório."),
    description: z.string().min(1, "Descreva um pouco sobre seu problema."),
});

type FormData = z.infer<typeof schema>;

interface FormTicketProps {
    customer: CustomerDataInfo;
}

export default function FormTicket({ customer }: FormTicketProps) {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    async function handleRegisterTicket(data: FormData) {
        setLoading(true);
        try {
            await api.post("/api/ticket", {
                name: data.name,
                description: data.description,
                customerId: customer.id,
            });

            setValue("name", "");
            setValue("description", "");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="bg-slate-200 mt-6 py-6 px-4 rounded border-2" onSubmit={handleSubmit(handleRegisterTicket)}>
            <label className="mb-1 font-medium text-lg">Nome do chamado</label>
            <Input
                register={register}
                type="text"
                placeholder="Digite o nome do chamado"
                name="name"
                error={errors.name?.message}
            />
            <div className="mt-4">
                <label className="mb-2 font-medium text-lg">Descreva o problema</label>
                <textarea
                    className="w-full border-2 rounded-md h-24 resize-none px-2"
                    placeholder="Descreva o problema"
                    id="description"
                    {...register("description")}
                ></textarea>
            </div>
            {errors.description?.message && <p className="text-red-500 mt-1 mb-4">{errors.description.message}</p>}

            <button
                type="submit"
                className="bg-blue-500 rounded-md w-full h-11 px-2 text-white font-bold flex items-center justify-center"
                disabled={loading}
            >
                {loading ? <ImSpinner10 className="animate-spin" size={24} /> : "Cadastrar"}
            </button>
        </form>
    );
}
