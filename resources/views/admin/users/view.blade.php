@extends('layouts.admin')

@section('title')
    Manage User: {{ $user->username }}
@endsection

@section('content-header')
    <h1>{{ $user->name_first }} {{ $user->name_last}}<small>{{ $user->username }}</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li><a href="{{ route('admin.users') }}">Users</a></li>
        <li class="active">{{ $user->username }}</li>
    </ol>
@endsection

@section('content')
@php
    $pageData = [
        'deleteAction' => route('admin.users.view', $user->id),
        'languages' => collect($languages)->map(function ($value, $key) use ($user) {
            return ['key' => $key, 'value' => $value, 'selected' => $user->language === $key];
        })->values(),
        'updateAction' => route('admin.users.view', $user->id),
        'user' => [
            'canDelete' => $user->servers->count() < 1,
            'email' => $user->email,
            'name_first' => $user->name_first,
            'name_last' => $user->name_last,
            'root_admin' => (bool) $user->root_admin,
            'username' => $user->username,
        ],
    ];
@endphp
<div
    id="admin-page-root"
    data-page="user-view"
    data-props='@json($pageData)'
></div>
@endsection
